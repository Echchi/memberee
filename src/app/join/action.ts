"use server";

import { z } from "zod";
import validator from "validator";
import {
  CO_NUM_REGEX,
  ID_REGEX,
  ID_REGEX_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/libs/constants";
import db from "@/libs/server/db";
interface ICheckPassword {
  password: string;
  confirm_password: string;
}

const checkUserid = async (userid: string) => {
  const user = await db.user.findUnique({
    where: {
      userid,
    },
    select: {
      userid: true,
    },
  });
  return !user;
};

const checkCoNum = async (num: string) => {
  const company = await db.company.findUnique({
    where: {
      num,
    },
  });
  return !company;
};

const checkPassword = ({ password, confirm_password }: ICheckPassword) =>
  password === confirm_password;

const formSchema = z
  .object({
    username: z.string().min(2, "이름을 올바르게 입력해주세요").trim(),
    userid: z
      .string()
      .trim()
      .regex(ID_REGEX, ID_REGEX_ERROR)
      .refine(checkUserid, "이미 존재하는 아이디예요"),
    password: z
      .string()
      .min(4, "비밀번호는 4자리 이상이여야해요")
      .trim()
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(4, "비밀번호는 4자리 이상이여야해요")
      .trim(),
    phone: z
      .string()
      .trim()
      .refine(
        (phone) => validator.isMobilePhone(phone, "ko-KR"),
        "연락처를 올바르게 입력해주세요",
      ),
    email: z.string().trim().email("이메일을 올바르게 입력해주세요"),
    co_name: z.string().trim(),
    co_num: z
      .string({ required_error: "사업자등록번호를 올바르게 입력해주세요" })
      .trim()
      .regex(CO_NUM_REGEX, "사업자등록번호를 올바르게 입력해주세요"),
    payDay: z.string(),
    co_contact: z
      .string()
      .trim()
      .refine(
        (phone) => validator.isMobilePhone(phone, "ko-KR"),
        "연락처를 올바르게 입력해주세요",
      ),
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않아요",
    path: ["confirm_password"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  console.log(formData);
  const data = {
    username: formData.get("username"),
    userid: formData.get("userid"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    co_name: formData.get("co_name"),
    payDay: formData.get("payDay"),
    co_contact: formData.get("co_contact"),
    co_num: formData.get("co_num"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);

    // 사업자등록번호 중복 체크
    // 비밀번호 해시
    // 로그인
  }
};
