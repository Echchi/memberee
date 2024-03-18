"use server";

import { z } from "zod";

const formSchema = z.object({
  userid: z.string({ required_error: "아이디를 입력해주세요" }).trim(),
  password: z.string({ required_error: "비밀번호를 입력해주세요" }).trim(),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    userid: formData.get("userid"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }

  console.log(formData);
}
