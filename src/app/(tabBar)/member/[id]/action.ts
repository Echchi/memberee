"use server";

import { z } from "zod";
import validator from "validator";
import {
  BIRTH_REGEX,
  BIRTH_REGEX_ERROR,
  MONEY_REGEX,
  MONEY_REGEX_ERROR,
  ONLY_NUMBER_REGEX,
  ONLY_NUMBER_REGEX_ERROR,
  STARTDATE_REGEX,
  STARTDATE_REGEX_ERROR,
} from "@/libs/constants";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { combineCurrentDateWithTime, formatISODate } from "@/libs/client/utils";
import { redirect, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    .string()
    .trim()
    .transform((val) => parseInt(val, 10)),
  startDate: z.string().trim().regex(STARTDATE_REGEX, STARTDATE_REGEX_ERROR),
});

export const updateMember = async (
  id: string,
  prevState: any,
  formData: FormData,
) => {
  const session = await getSession();
  const companyId = session.company;
  const savedMember = await db.member.findUnique({
    where: { id: +id, companyId },
    include: {
      Schedule: {
        include: {
          Salary: true,
          worker: true,
        },
      },
      worker: true,
    },
  });

  const data = {
    name: formData.get("name") || savedMember?.name,
    phone: formData.get("phone") || savedMember?.phone,
    birth: formData.get("birth") || savedMember?.birth,
    job: formData.get("job") || savedMember?.job,
    dayOfWeek:
      formData.get("dayOfWeek") ||
      savedMember?.Schedule?.map((item, index) => item.dayOfWeek),
    times: JSON.parse(formData.get("times") as string),

    lessonFee:
      formData.get("lessonFee") || savedMember?.Schedule?.[0]?.lessonFee,
    worker: formData.get("worker") || savedMember?.worker,
    startDate: formData.get("startDate") || savedMember?.startDate,
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const member = await db.member.update({
      where: { id: +id, companyId },
      data: {
        name: result.data.name,
        phone: result.data.phone,
        birth: formatISODate(result.data.birth),
        job: result.data.job,
        workerId: result.data.worker,
        startDate: formatISODate(result.data.startDate),
        companyId: companyId,
      },
      include: {
        worker: true,
      },
    });

    console.log("========== member =========", member);

    if (savedMember && savedMember.Schedule && formData.get("lessonFee")) {
      const salary = savedMember.Schedule.map(async (schedule) => {
        await db.schedule.update({
          where: { id: schedule.id },
          data: {
            lessonFee: result.data.lessonFee,
          },
        });

        if (schedule.Salary) {
          return db.salary.update({
            where: { id: schedule.Salary.id },
            data: {
              salaryForLesson: Math.round(
                result.data.lessonFee *
                  ((schedule.worker.commission || 100) / 100),
              ),
            },
          });
        }
      });
      const completedUpdates = await Promise.all(salary);
      console.log("========== salary =========", completedUpdates);
    }

    const existingDays = new Set(
      savedMember?.Schedule.map((sch) => sch.dayOfWeek),
    );

    const schedulePromises = Object.entries(data.times).map(
      // @ts-ignore
      async ([dayOfWeek, { startTime, endTime }]) => {
        const dayNum = parseInt(dayOfWeek);
        if (existingDays.has(dayNum)) {
          const existingSchedule = savedMember?.Schedule.find(
            (sch) => sch.dayOfWeek === dayNum,
          );

          return await db.schedule.update({
            where: {
              id: existingSchedule?.id,
              dayOfWeek: dayNum,
            },
            data: {
              startTime: combineCurrentDateWithTime(startTime),
              endTime: combineCurrentDateWithTime(endTime),
            },
          });
        } else {
          existingDays.add(dayNum);
          return db.$transaction(async (prisma) => {
            const newSalary = await prisma.salary.create({
              data: {
                salaryForLesson: Math.round(
                  result.data.lessonFee *
                    (member?.worker?.commission || 1 / 100),
                ),
              },
            });

            return prisma.schedule.create({
              data: {
                workerId: member?.workerId,
                memberId: member?.id,
                lessonFee: result.data.lessonFee,
                dayOfWeek: dayNum,
                startTime: combineCurrentDateWithTime(startTime),
                endTime: combineCurrentDateWithTime(endTime),
                salaryId: newSalary.id,
              },
            });
          });
        }
      },
    );

    const deletePromises = Array.from(existingDays)
      .filter((day) => !data.times.hasOwnProperty(day))
      .map(async (day) => {
        const scheduleToDelete = savedMember?.Schedule.find(
          (sch) => sch.dayOfWeek === day,
        );
        return await db.schedule.deleteMany({
          where: { id: scheduleToDelete?.id },
        });
      });

    redirect(`${id}`);
  }
};
