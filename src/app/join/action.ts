"use server";

import { z } from "zod";
import validator from "validator";
import {
  ID_REGEX,
  ID_REGEX_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/libs/constants";
interface ICheckPassword {
  password: string;
  confirm_password: string;
}

const checkPassword = ({ password, confirm_password }: ICheckPassword) =>
  password === confirm_password;

const formSchema = z
  .object({
    username: z.string().min(2, "이름을 올바르게 입력해주세요").trim(),
    userid: z.string().trim().regex(ID_REGEX, ID_REGEX_ERROR),
    password: z
      .string()
      .min(4, "")
      .trim()
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(4, "").trim(),
    phone: z
      .string()
      .trim()
      .refine(
        (phone) => validator.isMobilePhone(phone, "ko-KR"),
        "연락처를 올바르게 입력해주세요",
      ),
    email: z.string().trim().email("이메일을 올바르게 입력해주세요"),
    co_name: z.string().trim(),
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
  const data = {
    username: formData.get("username"),
    userid: formData.get("userid"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    co_name: formData.get("co_name"),
    co_contact: formData.get("co_contact"),
  };

  const res = formSchema.safeParse(data);
  if (!res.success) {
    console.log(res.error.flatten());
    return res.error.flatten();
  } else {
    console.log(res.data);
  }
};
