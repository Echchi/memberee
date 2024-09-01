"use server";

import { z } from "zod";
import validator from "validator";
import {
  BIRTH_REGEX,
  BIRTH_REGEX_ERROR,
  DATE_REGEX,
  MONEY_REGEX,
  MONEY_REGEX_ERROR,
  STARTDATE_REGEX,
  STARTDATE_REGEX_ERROR,
} from "../../../../libs/regex";
import db from "../../../../libs/server/db";
import getSession from "../../../../libs/client/session";
import {
  combineCurrentDateWithTime,
  formatISODate,
} from "../../../../libs/client/utils";
import { redirect } from "next/navigation";
import { PaymentType } from "../../../../libs/constants";

const formSchema = z.object({
  name: z.string().min(2, "이름을 올바르게 입력해주세요").trim(),
  phone: z
    .string()
    .trim()
    .refine(
      (phone) => validator.isMobilePhone(phone, "ko-KR"),
      "연락처를 올바르게 입력해주세요",
    ),
  birth: z.string().trim().regex(BIRTH_REGEX, BIRTH_REGEX_ERROR),
  job: z.string().trim().optional(),
  dayOfWeek: z.string().trim().min(1, "요일을 선택해주세요"),
  lessonFee: z
    .string()
    .trim()
    .regex(MONEY_REGEX, MONEY_REGEX_ERROR)
    .transform((val) => parseInt(val, 10)),
  worker: z
    .string({ message: "담당직원을 선택해주세요" })
    .trim()
    .transform((val) => parseInt(val, 10)),
  startDate: z.string().trim().regex(STARTDATE_REGEX, STARTDATE_REGEX_ERROR),
  payDay: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
});

export const createMember = async (
  bulk: boolean = false,
  prevState: any,
  formData: FormData,
) => {
  const session = await getSession();
  const companyId = session.company;
  const paymentType = session.paymentType;
  console.log("createMember", formData);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    birth: formData.get("birth"),
    job: formData.get("job"),
    dayOfWeek: formData.get("dayOfWeek"),
    times: JSON.parse(formData.get("times") as string),
    lessonFee: formData.get("lessonFee"),
    worker: formData.get("worker"),
    startDate: formData.get("startDate"),
    content: formData.get("content"),
  } as any;

  if (paymentType === PaymentType.DIFFERENT) {
    data.payDay = formData.get("payDay");
  }

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const transactionResult = await db.$transaction(async (prisma) => {
      console.log("result", result);
      const member = await db.member.create({
        data: {
          name: result.data.name,
          phone: result.data.phone,
          birth: formatISODate(result.data.birth),
          job: result.data.job,
          workerId: result.data.worker,
          startDate: formatISODate(result.data.startDate),
          companyId: companyId,
          payDay: Number(result.data.payDay),
        },
        include: {
          worker: true,
        },
      });

      const workerChangeLog = await db.workerChangeLog.create({
        data: {
          memberId: member.id,
          workerId: Number(result.data.worker),
          previousWorkerId: Number(result.data.worker),
          changedDate: formatISODate(result.data.startDate),
        },
      });

      const salary = await db.salary.create({
        data: {
          salaryForLesson: Math.round(
            result.data.lessonFee * (member?.worker?.commission || 1 / 100),
          ),
        },
      });

      if (data?.times) {
        const schedulePromises = Object.entries(data?.times).map(
          // @ts-ignore
          ([dayOfWeek, { startTime: startTimeVal, endTime: endTimeVal }]) =>
            db.schedule.create({
              data: {
                workerId: member.worker!.id,
                memberId: member.id,
                lessonFee: result.data.lessonFee,
                dayOfWeek: parseInt(dayOfWeek, 10),
                startTime: combineCurrentDateWithTime(startTimeVal),
                endTime: combineCurrentDateWithTime(endTimeVal),
                salaryId: salary.id,
              },
            }),
        );
        const schedules = await db.$transaction(schedulePromises);
      }

      if (result.data.content) {
        const Memo = await db.memo.create({
          data: {
            content: result.data.content,
            memberId: member.id,
          },
        });
      }
      return member;
    });
    !bulk && redirect(`${transactionResult.id}`);
  }
};
