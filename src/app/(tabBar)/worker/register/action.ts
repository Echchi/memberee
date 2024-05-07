"use server";

import { z } from "zod";
import validator from "validator";
import {
  BIRTH_REGEX,
  BIRTH_REGEX_ERROR,
  ONLY_NUMBER_REGEX,
  ONLY_NUMBER_REGEX_ERROR,
  STARTDATE_REGEX,
  STARTDATE_REGEX_ERROR,
} from "@/libs/constants";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { formatISODate } from "@/libs/client/utils";
import { redirect } from "next/navigation";

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
  startDate: z.string().trim().regex(STARTDATE_REGEX, STARTDATE_REGEX_ERROR),
  dayOfWeek: z.string().trim().min(1, "근무 요일을 선택해주세요"),
  commission: z
    .string()
    .trim()
    .transform((val) => parseInt(val, 10)),
  bank: z.string().trim(),
  accountNumber: z
    .string()
    .trim()
    .regex(ONLY_NUMBER_REGEX, ONLY_NUMBER_REGEX_ERROR),
  content: z.string().nullable().optional(),
});

export const createWorker = async (
  bulk: boolean = false,
  prevState: any,
  formData: FormData,
) => {
  console.log("createWorker formData", formData);
  const session = await getSession();
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    birth: formData.get("birth"),
    startDate: formData.get("startDate"),
    dayOfWeek: formData.get("dayOfWeek"),
    commission: formData.get("commission"),
    bank: formData.get("bank"),
    accountNumber: formData.get("accountNumber"),
    content: formData.get("content"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log("worker register ?", result.data);
    const worker = await db.worker.create({
      data: {
        name: result.data.name,
        phone: result.data.phone,
        birth: formatISODate(result.data.birth),
        startDate: formatISODate(result.data.startDate),
        dayOfWeek: result.data.dayOfWeek,
        commission: result.data.commission,
        bank: result.data.bank,
        accountNumber: result.data.accountNumber,
        companyId: session.company,
      },
    });

    if (result.data.content) {
      const workerMemo = await db.workerMemo.create({
        data: {
          content: result.data.content,
          workerId: worker.id,
        },
      });
    }
    !bulk && redirect(`${worker.id}`);
  }
};
