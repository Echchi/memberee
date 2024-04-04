"use server";

import { z } from "zod";
import db from "@/libs/server/db";
import bcrypt from "bcrypt";
import getSession from "@/libs/client/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  userid: z.string().min(1, { message: "아이디를 입력해주세요" }).trim(),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요" }).trim(),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    userid: formData.get("userid"),
    password: formData.get("password"),
  };
  console.log(formData);

  const result = formSchema.safeParse(data);
  console.log(result.success);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        userid: result.data.userid,
      },
      select: {
        id: true,
        password: true,
        status: true,
        Company: {
          select: {
            id: true,
          },
        },
      },
    });
    const ok = await bcrypt.compare(result.data.password, user?.password ?? "");
    console.log("user", user);
    if (ok) {
      const isConfirmed = user!.status > 0;
      if (!isConfirmed) {
        return {
          fieldErrors: {
            password: ["가입 대기중입니다. 조금만 기다려주세요."],
            userid: [],
          },
        };
      } else {
        const session = await getSession();
        session.id = user!.id;
        session.company = user!.Company[0].id;
        await session.save();
        redirect("/main");
      }
    } else {
      return {
        fieldErrors: {
          password: ["일치하는 계정이 존재하지 않습니다"],
          userid: [],
        },
      };
    }
  }
}
