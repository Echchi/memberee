"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/component/input";
import Button from "@/component/button";
import { useForm } from "react-hook-form";
import ic_user from "icons/ic_user.svg";
import React from "react";
interface LoginData {
  id: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<LoginData>();

  const router = useRouter();
  const watchId = watch("id");
  const watchPassword = watch("password");
  const isButtonDisabled = !watchId || !watchPassword;

  const onValid = (data: LoginData) => {
    if (data.id === "tennis" && data.password === "12345") {
      router.push("/main");
    } else {
      setError("id", { message: "아이디 또는 비밀번호를 확인해주세요" });
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onValid)} className="w-full mt-32 px-8">
        <div className="flex flex-col justify-center items-center space-y-3">
          <h3 className="text-5xl md:text-7xl font-extrabold text-emerald-700">
            memberee
          </h3>
          {/*<h3 className="ml-3 text-black">누구나 편하게 쓰기 쉬운 회원관리 </h3>*/}
        </div>

        <div className="w-full h-32 mt-16">
          <Input
            required={true}
            type={"text"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            }
            placeholder={"아이디"}
            className="h-1/2 rounded-t-xl"
            register={register("id", { required: true })}
          />
          <Input
            required={true}
            type={"password"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            }
            placeholder={"비밀번호"}
            className="h-1/2 rounded-b-xl border-t-0"
            register={register("password", { required: true })}
          />
        </div>
        {errors?.id?.message && (
          <p className="text-orange-500 text-center mt-5">
            {errors.id.message}
          </p>
        )}
        <Button
          text={"로그인"}
          isButtonDisabled={isButtonDisabled}
          large={true}
          className={"mt-5"}
        />
        <div className="grid grid-cols-3 divide-x divide-gray-300 mt-5 text-gray-400 w-11/12 mx-auto *:text-center">
          <div>
            <Link href={"/"}>아이디 찾기</Link>
          </div>
          <div className="text-emerald-600 font-semibold">
            <Link href={"/join"}>회원가입</Link>
          </div>
          <div>
            <Link href={"/"}>비밀번호 찾기</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
