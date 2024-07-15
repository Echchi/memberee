"use client";
import { Controller, useForm } from "react-hook-form";
import Input from "../../component/input";
import FormButton from "../../component/button/formButton";
import { checkCoNum, checkUserid, createAccount } from "./action";
import { joinFormSchema, JoinType } from "./schema";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ID_REGEX_ERROR,
  ONLY_NUMBER_REGEX,
  ONLY_NUMBER_REGEX_ERROR,
  PHONE_REGEX_ERROR,
} from "../../libs/regex";
import validator from "validator";
import { checkExpiresAt } from "./api";
import Error from "../error";
import TokenError from "../tokenError";
import JoinForm from "../../component/page/join/joinForm";
import { Suspense } from "react";

const Join = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  // const [email, setEmail] = useState("");
  // const [errorPage, setErrorPage] = useState(true);
  // const checkTokenExpires = async (token: string) => {
  //   try {
  //     const result = await checkExpiresAt(token);
  //     console.log("checkTokenExpires result", result);
  //     if (result.email) {
  //       setErrorPage(false);
  //       setEmail(result.email);
  //     }
  //   } catch {
  //     setErrorPage(true);
  //   }
  // };
  //
  // useEffect(() => {
  //   const token = searchParams?.token || "";
  //   if (token) {
  //     checkTokenExpires(token);
  //   }
  // }, [searchParams]);

  // const router = useRouter();
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   setError,
  //   control,
  //   clearErrors,
  //   watch,
  //   getValues,
  // } = useForm({
  //   // resolver: zodResolver(joinFormSchema),
  //   mode: "onBlur",
  //   defaultValues: {
  //     username: "",
  //     userid: "",
  //     password: "",
  //     confirm_password: "",
  //     // phone: "",
  //     email: "",
  //     co_name: "",
  //     co_num: "",
  //     payday: "",
  //     // co_contact: "",
  //   },
  // });
  //
  // const userid = watch("userid");
  //
  // // const phone = watch("phone");
  //
  // const co_num = watch("co_num");
  //
  // const onSubmit = async (data: JoinFormType) => {
  //   console.log("onSubmit data", data);
  //   data.payDay = payday;
  //   data.userid = userid;
  //   // data.phone = phone;
  //   data.co_num = co_num;
  //   data.email = email;
  //
  //   // console.log("onSubmit 제출 잘 되었는가", data);
  //   try {
  //     await createAccount(data);
  //   } catch (error) {
  //     console.error("Failed to create account", error);
  //   }
  // };
  //
  // const [payday, setPayday] = useState("1");
  //
  // const onBlurUserid = async (
  //   event: React.FocusEvent<HTMLInputElement>,
  //   fieldOnBlur: () => void,
  // ) => {
  //   const userId = event.target.value.trim();
  //
  //   if (userId.length === 0) {
  //     setError("userid", {
  //       type: "manual",
  //       message: ID_REGEX_ERROR,
  //     });
  //   } else if (userId.length < 4) {
  //     setError("userid", {
  //       type: "manual",
  //       message: ID_REGEX_ERROR,
  //     });
  //   } else if (userId.length >= 4) {
  //     const isUseridUnique = await checkUserid(userId);
  //
  //     if (!isUseridUnique) {
  //       setError("userid", {
  //         type: "manual",
  //         message: "이미 존재하는 아이디예요",
  //       });
  //     } else {
  //       clearErrors("userid");
  //     }
  //   }
  // };
  // // const onBlurPhone = async (
  // //   event: React.FocusEvent<HTMLInputElement>,
  // //   fieldOnBlur: () => void,
  // // ) => {
  // //   const phone = event.target.value.trim();
  // //   if (phone.length === 0) {
  // //     setError("phone", {
  // //       type: "manual",
  // //       message: PHONE_REGEX_ERROR,
  // //     });
  // //   } else if (!validator.isMobilePhone(phone, "ko-KR")) {
  // //     setError("phone", {
  // //       type: "manual",
  // //       message: PHONE_REGEX_ERROR,
  // //     });
  // //   } else {
  // //     const isPhoneUnique = await checkPhone(phone);
  // //
  // //     if (!isPhoneUnique) {
  // //       setError("phone", {
  // //         type: "manual",
  // //         message: "이미 가입된 번호예요",
  // //       });
  // //     } else {
  // //       clearErrors("phone");
  // //     }
  // //   }
  // // };
  // const onBlurCoNum = async (
  //   event: React.FocusEvent<HTMLInputElement>,
  //   fieldOnBlur: () => void,
  // ) => {
  //   const coNum = event.target.value.trim();
  //
  //   if (coNum.length === 0) {
  //     setError("co_num", {
  //       type: "manual",
  //       message: PHONE_REGEX_ERROR,
  //     });
  //   } else if (!ONLY_NUMBER_REGEX.test(coNum)) {
  //     setError("co_num", {
  //       type: "manual",
  //       message: ONLY_NUMBER_REGEX_ERROR,
  //     });
  //   } else {
  //     const isCoNumUnique = await checkCoNum(coNum);
  //
  //     if (!isCoNumUnique) {
  //       setError("co_num", {
  //         type: "manual",
  //         message: "이미 가입된 번호예요",
  //       });
  //     } else {
  //       clearErrors("co_num");
  //     }
  //   }
  // };

  return (
    <Suspense>
      <JoinForm token={token} />
    </Suspense>
  );
  {
    /*<>*/
  }
  {
    /*  {errorPage ? (*/
  }
  {
    /*    <TokenError />*/
  }
  {
    /*  ) : (*/
  }

  {
    /*    <form*/
  }
  {
    /*      onSubmit={handleSubmit(onSubmit)}*/
  }
  {
    /*      className="xl:pt-10 xl:max-w-full xl:w-[1400px] xl:mx-auto px-3 xl:px-32 text-stone-800"*/
  }
  {
    /*      data-testid="join-form"*/
  }
  {
    /*    >*/
  }
  {
    /*      <div className="flex flex-col justify-center items-center mt-8">*/
  }
  {
    /*        <h3*/
  }
  {
    /*          className="text-5xl font-extrabold ml-3 text-emerald-700 cursor-pointer"*/
  }
  {
    /*          onClick={() => router.push("/login")}*/
  }
  {
    /*        >*/
  }
  {
    /*          memberee*/
  }
  {
    /*        </h3>*/
  }
  {
    /*        <h3 className="text-black py-2">*/
  }
  {
    /*          누구나 편하게 쓰기 쉬운 회원관리*/
  }
  {
    /*        </h3>*/
  }
  {
    /*      </div>*/
  }
  {
    /*      <div className="px-3 mt-4 mb-8">*/
  }
  {
    /*        <p className="font-semibold tracking-wide text-stone-600 pt-5 pb-3 xl:text-lg">*/
  }
  {
    /*          관리자 정보*/
  }
  {
    /*        </p>*/
  }
  {
    /*        <Input*/
  }
  {
    /*          icon={*/
  }
  {
    /*            <svg*/
  }
  {
    /*              xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*              viewBox="0 0 24 24"*/
  }
  {
    /*              fill="currentColor"*/
  }
  {
    /*              className="w-6 h-6 text-gray-300"*/
  }
  {
    /*            >*/
  }
  {
    /*              <path*/
  }
  {
    /*                fillRule="evenodd"*/
  }
  {
    /*                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"*/
  }
  {
    /*                clipRule="evenodd"*/
  }
  {
    /*              />*/
  }
  {
    /*            </svg>*/
  }
  {
    /*          }*/
  }
  {
    /*          type={"text"}*/
  }
  {
    /*          placeholder={"이름"}*/
  }
  {
    /*          required={true}*/
  }
  {
    /*          className={"h-16 rounded-t-lg"}*/
  }
  {
    /*          {...register("username")}*/
  }
  {
    /*          errorMessage={[errors.username?.message ?? ""]}*/
  }
  {
    /*        />*/
  }
  {
    /*        <Controller*/
  }
  {
    /*          render={({ field }) => (*/
  }
  {
    /*            <Input*/
  }
  {
    /*              icon={*/
  }
  {
    /*                <svg*/
  }
  {
    /*                  xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*                  viewBox="0 0 24 24"*/
  }
  {
    /*                  fill="currentColor"*/
  }
  {
    /*                  className="w-6 h-6 text-gray-300"*/
  }
  {
    /*                >*/
  }
  {
    /*                  <path*/
  }
  {
    /*                    fillRule="evenodd"*/
  }
  {
    /*                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"*/
  }
  {
    /*                    clipRule="evenodd"*/
  }
  {
    /*                  />*/
  }
  {
    /*                </svg>*/
  }
  {
    /*              }*/
  }
  {
    /*              type={"text"}*/
  }
  {
    /*              placeholder={"아이디"}*/
  }
  {
    /*              maxLength={10}*/
  }
  {
    /*              required={true}*/
  }
  {
    /*              className={"h-16 border-t-0 border-b-1"}*/
  }
  {
    /*              {...field}*/
  }
  {
    /*              onBlur={(e) => onBlurUserid(e, field.onBlur)}*/
  }
  {
    /*              errorMessage={[errors.userid?.message ?? ""]}*/
  }
  {
    /*            />*/
  }
  {
    /*          )}*/
  }
  {
    /*          name="userid"*/
  }
  {
    /*          control={control}*/
  }
  {
    /*        />*/
  }

  {
    /*        <Input*/
  }
  {
    /*          icon={*/
  }
  {
    /*            <svg*/
  }
  {
    /*              xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*              viewBox="0 0 24 24"*/
  }
  {
    /*              fill="currentColor"*/
  }
  {
    /*              className="w-6 h-6 text-gray-300"*/
  }
  {
    /*            >*/
  }
  {
    /*              <path*/
  }
  {
    /*                fillRule="evenodd"*/
  }
  {
    /*                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"*/
  }
  {
    /*                clipRule="evenodd"*/
  }
  {
    /*              />*/
  }
  {
    /*            </svg>*/
  }
  {
    /*          }*/
  }
  {
    /*          type={"text"}*/
  }
  {
    /*          placeholder={"비밀번호"}*/
  }
  {
    /*          required={true}*/
  }
  {
    /*          className={"h-16 border-t-0 border-b-1"}*/
  }
  {
    /*          {...register("password")}*/
  }
  {
    /*          errorMessage={[errors.password?.message ?? ""]}*/
  }
  {
    /*        />*/
  }
  {
    /*        <Input*/
  }
  {
    /*          icon={*/
  }
  {
    /*            <svg*/
  }
  {
    /*              xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*              viewBox="0 0 24 24"*/
  }
  {
    /*              fill="currentColor"*/
  }
  {
    /*              className="w-6 h-6 text-gray-300"*/
  }
  {
    /*            >*/
  }
  {
    /*              <path*/
  }
  {
    /*                fillRule="evenodd"*/
  }
  {
    /*                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"*/
  }
  {
    /*                clipRule="evenodd"*/
  }
  {
    /*              />*/
  }
  {
    /*            </svg>*/
  }
  {
    /*          }*/
  }
  {
    /*          type={"text"}*/
  }
  {
    /*          placeholder={"비밀번호 확인"}*/
  }
  {
    /*          required={true}*/
  }
  {
    /*          className={"h-16 border-t-0 border-b-1 rounded-b-lg"}*/
  }
  {
    /*          {...register("confirm_password")}*/
  }
  {
    /*          errorMessage={[errors.confirm_password?.message ?? ""]}*/
  }
  {
    /*        />*/
  }

  {
    /*        <p className="font-semibold tracking-wide text-stone-600 pt-8 pb-3 xl:text-lg">*/
  }
  {
    /*          업체 정보*/
  }
  {
    /*        </p>*/
  }
  {
    /*        <Input*/
  }
  {
    /*          icon={*/
  }
  {
    /*            <svg*/
  }
  {
    /*              xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*              viewBox="0 0 24 24"*/
  }
  {
    /*              fill="currentColor"*/
  }
  {
    /*              className="w-6 h-6 text-gray-300"*/
  }
  {
    /*            >*/
  }
  {
    /*              <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />*/
  }
  {
    /*              <path*/
  }
  {
    /*                fillRule="evenodd"*/
  }
  {
    /*                d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"*/
  }
  {
    /*                clipRule="evenodd"*/
  }
  {
    /*              />*/
  }
  {
    /*            </svg>*/
  }
  {
    /*          }*/
  }
  {
    /*          type={"text"}*/
  }
  {
    /*          placeholder={"업체명"}*/
  }
  {
    /*          required={true}*/
  }
  {
    /*          className={"h-16 border-t-1 border-b-1 rounded-t-lg"}*/
  }
  {
    /*          {...register("co_name")}*/
  }
  {
    /*          errorMessage={[errors.co_name?.message ?? ""]}*/
  }
  {
    /*        />*/
  }
  {
    /*        <Controller*/
  }
  {
    /*          render={({ field }) => (*/
  }
  {
    /*            <Input*/
  }
  {
    /*              icon={*/
  }
  {
    /*                <svg*/
  }
  {
    /*                  xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*                  viewBox="0 0 24 24"*/
  }
  {
    /*                  fill="currentColor"*/
  }
  {
    /*                  className="w-6 h-6 text-gray-300"*/
  }
  {
    /*                >*/
  }
  {
    /*                  <path*/
  }
  {
    /*                    fillRule="evenodd"*/
  }
  {
    /*                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"*/
  }
  {
    /*                    clipRule="evenodd"*/
  }
  {
    /*                  />*/
  }
  {
    /*                </svg>*/
  }
  {
    /*              }*/
  }
  {
    /*              type={"text"}*/
  }
  {
    /*              placeholder={"사업자 등록 번호를 숫자로만 입력해주세요"}*/
  }
  {
    /*              required={true}*/
  }
  {
    /*              className={"h-16 border-t-0"}*/
  }
  {
    /*              {...field}*/
  }
  {
    /*              maxLength={10}*/
  }
  {
    /*              onBlur={(e) => onBlurCoNum(e, field.onBlur)}*/
  }
  {
    /*              errorMessage={[errors.co_num?.message ?? ""]}*/
  }
  {
    /*            />*/
  }
  {
    /*          )}*/
  }
  {
    /*          name="co_num"*/
  }
  {
    /*          control={control}*/
  }
  {
    /*        />*/
  }

  {
    /*        <Input*/
  }
  {
    /*          icon={*/
  }
  {
    /*            <svg*/
  }
  {
    /*              xmlns="http://www.w3.org/2000/svg"*/
  }
  {
    /*              viewBox="0 0 24 24"*/
  }
  {
    /*              fill="currentColor"*/
  }
  {
    /*              className="w-6 h-6 text-gray-300"*/
  }
  {
    /*            >*/
  }
  {
    /*              <path*/
  }
  {
    /*                fillRule="evenodd"*/
  }
  {
    /*                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"*/
  }
  {
    /*                clipRule="evenodd"*/
  }
  {
    /*              />*/
  }
  {
    /*            </svg>*/
  }
  {
    /*          }*/
  }
  {
    /*          onSelectChange={(e) => setPayday(e.target.value)}*/
  }
  {
    /*          value={payday}*/
  }
  {
    /*          required={true}*/
  }
  {
    /*          className={"h-16 border-t-0 rounded-b-lg"}*/
  }
  {
    /*          type={"select"}*/
  }
  {
    /*          selectDescription={"일이 납부일이에요"}*/
  }
  {
    /*          options={Array.from({ length: 31 }, (_, index) => ({*/
  }
  {
    /*            value: index + 1,*/
  }
  {
    /*            label: (index + 1).toString(),*/
  }
  {
    /*          }))}*/
  }
  {
    /*        />*/
  }

  {
    /*        <FormButton*/
  }
  {
    /*          text={"회원가입"}*/
  }
  {
    /*          className={"mt-5"}*/
  }
  {
    /*          isButtonDisabled={Object.entries(errors).length > 0}*/
  }
  {
    /*        />*/
  }
  {
    /*      </div>*/
  }
  {
    /*    </form>*/
  }
  {
    /*  )}*/
  }
  {
    /*</>*/
  }
};

export default Join;
