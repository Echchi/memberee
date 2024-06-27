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
} from "@/libs/regex";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { formatISODate } from "@/libs/client/utils";
import { redirect, useSearchParams } from "next/navigation";

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
});

export const updateWorker = async (
  id: string,
  prevState: any,
  formData: FormData,
) => {
  const session = await getSession();
  const companyId = session.company;
  const worker = await db.worker.findUnique({
    where: { id: +id, companyId },
  });

  const data = {
    name: formData.get("name") || worker?.name,
    phone: formData.get("phone") || worker?.phone,
    birth: formData.get("birth") || worker?.birth,
    startDate: formData.get("startDate") || worker?.startDate,

    dayOfWeek: formData.get("dayOfWeek") || worker?.dayOfWeek,
    commission: formData.get("commission") || worker?.commission,
    bank: formData.get("bank") || worker?.bank,
    accountNumber: formData.get("accountNumber") || worker?.accountNumber,
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const updatedWorker = await db.worker.update({
      where: { id: +id, companyId },
      data: {
        ...result.data,
        birth: formatISODate(result.data.birth),
        startDate: formatISODate(result.data.startDate),
      },
    });

    redirect(`${id}`);
  }
};
