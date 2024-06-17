"use server";

import { z } from "zod";
import validator from "validator";
import bcrypt from "bcrypt";
import {
  CO_NUM_REGEX,
  ID_REGEX,
  ID_REGEX_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/libs/constants";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { redirect } from "next/navigation";

// interface ICheckPassword {
//   password: string | null | undefined;
//   confirm_password: string | null | undefined;
// }

const checkPhone = async (phone: string, userId: number) => {
  const user = await db.user.findFirst({
    where: {
      phone,
      id: {
        not: userId,
      },
      status: { in: [-1, 1] },
    },
    select: {
      userid: true,
    },
  });
  return !user;
};

// const checkPassword = ({ password, confirm_password }: ICheckPassword) => {
//   if (password == null || confirm_password == null) {
//     return true;
//   }
//   return password === confirm_password;
// };

const formSchema = z.object({
  username: z.string().min(2, "이름을 올바르게 입력해주세요").trim(),

  // password: z
  //   .string()
  //   .min(4, "비밀번호는 4자리 이상이여야해요")
  //   .trim()
  //   .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
  //   .nullable()
  //   .optional(),
  // confirm_password: z
  //   .string()
  //   .min(4, "비밀번호는 4자리 이상이여야해요")
  //   .trim()
  //   .nullable()
  //   .optional(),
  phone: z
    .string()
    .trim()
    .refine(
      (phone) => validator.isMobilePhone(phone, "ko-KR"),
      "연락처를 올바르게 입력해주세요",
    )
    .refine(async (phone) => {
      const session = await getSession();
      return await checkPhone(phone, Number(session.id));
    }, "이미 가입된 번호예요"),
  email: z.string().trim().email("이메일을 올바르게 입력해주세요"),
  co_name: z.string().trim(),
  payDay: z.string(),
  co_contact: z
    .string()
    .trim()
    .refine(
      (phone) => validator.isMobilePhone(phone, "ko-KR"),
      "연락처를 올바르게 입력해주세요",
    ),
});
// .refine(
//   (data) =>
//     checkPassword({
//       password: data.password,
//       confirm_password: data.confirm_password,
//     }),
//   {
//     message: "비밀번호가 일치하지 않아요",
//     path: ["confirm_password"],
//   },
// );

export const updateUser = async (prevState: any, formData: FormData) => {
  const session = await getSession();
  const id = session.id;

  const savedUser = await db.user.findUnique({
    where: { id: Number(id) },
    include: {
      Company: true,
    },
  });

  const data = {
    username: formData.get("username") || savedUser?.name,
    phone: formData.get("phone") || savedUser?.phone,
    email: formData.get("email") || savedUser?.email,
    co_name: formData.get("co_name") || savedUser?.Company[0].name,
    payDay: formData.get("payDay") || savedUser?.Company[0].payDay,
    co_contact: formData.get("co_contact") || savedUser?.Company[0].contact,
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: result.data.username,
        phone: result.data.phone,
        email: result.data.email,
      },
    });
    const company = await db.company.update({
      where: {
        id: savedUser?.Company[0].id,
      },
      data: {
        name: result.data.co_name,
        payDay: +result.data.payDay,
        contact: result.data.co_contact,
      },
    });

    redirect("account");
  }
};
