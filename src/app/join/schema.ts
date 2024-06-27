import { z } from "zod";
import {
  CO_NUM_REGEX,
  ID_REGEX,
  ID_REGEX_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/libs/regex";
import validator from "validator";
import { checkCoNum, checkPhone, checkUserid } from "@/app/join/action";
interface ICheckPassword {
  password: string;
  confirm_password: string;
}
export const checkPassword = ({ password, confirm_password }: ICheckPassword) =>
  password === confirm_password;

export const formSchema = z
  .object({
    username: z.string().trim().min(2, "이름을 올바르게 입력해주세요"),
    userid: z
      .string()
      .trim()
      .min(4, ID_REGEX_ERROR)
      .regex(ID_REGEX, ID_REGEX_ERROR),
    password: z
      .string()
      .trim()
      .min(4, PASSWORD_REGEX_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().trim(),
    phone: z
      .string()
      .trim()
      .refine(
        (phone) => validator.isMobilePhone(phone, "ko-KR"),
        "숫자로만 올바르게 입력해주세요",
      ),
    email: z.string().trim().email("이메일을 올바르게 입력해주세요"),
    co_name: z.string().trim(),
    co_num: z
      .string({ required_error: "사업자등록번호를 올바르게 입력해주세요" })
      .trim(),
    payDay: z.string().optional(),
    co_contact: z
      .string()
      .trim()
      .refine(
        (phone) => validator.isMobilePhone(phone, "ko-KR"),
        "연락처를 올바르게 입력해주세요",
      ),
  })
  .superRefine(async (data, ctx) => {
    if (
      !checkPassword({
        password: data.password,
        confirm_password: data.confirm_password,
      })
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않아요",
        path: ["confirm_password"],
      });
    }
    //
    //   const isUseridUnique = await checkUserid(data.userid);
    //   if (!isUseridUnique) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "이미 존재하는 아이디예요",
    //       path: ["userid"],
    //     });
    //   }
    //
    //   const isPhoneUnique = await checkPhone(data.phone);
    //   if (!isPhoneUnique) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "이미 가입된 번호예요",
    //       path: ["phone"],
    //     });
    //   }
    //   const isCoNumUnique = await checkCoNum(data.co_num);
    //   if (!isCoNumUnique) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "이미 등록된 사업자등록번호예요",
    //       path: ["co_num"],
    //     });
    //   }
  });

export type JoinType = z.infer<typeof formSchema>;
