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
    .regex(ONLY_NUMBER_REGEX, ONLY_NUMBER_REGEX_ERROR),
  bank: z.string().trim(),
  accountNumber: z
    .string()
    .trim()
    .regex(ONLY_NUMBER_REGEX, ONLY_NUMBER_REGEX_ERROR),
  content: z.string().optional(),
});

export const createWorker = async (prevState: any, formData: FormData) => {
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
  console.log(result.error);
};
