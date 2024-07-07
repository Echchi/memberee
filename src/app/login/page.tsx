"use client";
import Link from "next/link";
import Input from "@/component/input";
import React, { useState } from "react";
import FormButton from "@/component/button/formButton";
import { login } from "@/app/login/action";
import { useFormState } from "react-dom";
import Modal from "@/component/modal/modal";
import ChangePassword from "@/app/(tabBar)/account/changePassword";
import FindId from "@/app/login/findId";
import FindPassword from "./findPassword";
import Join from "@/app/login/join";

const Login = () => {
  const [state, action] = useFormState(login, null);
  const [isFindIdOpen, setIsFindIdOpen] = useState(false);
  const [isFindPasswordOpen, setIsFindPasswordOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  return (
    <>
      {isFindIdOpen && (
        <Modal
          onClose={() => setIsFindIdOpen(false)}
          title={"아이디 찾기"}
          content={<FindId onClose={() => setIsFindIdOpen(false)} />}
        />
      )}
      {isFindPasswordOpen && (
        <Modal
          onClose={() => setIsFindPasswordOpen(false)}
          title={"비밀번호 찾기"}
          content={
            <FindPassword onClose={() => setIsFindPasswordOpen(false)} />
          }
        />
      )}
      {isJoinOpen && (
        <Modal
          onClose={() => setIsJoinOpen(false)}
          title={"이메일 인증"}
          content={
            <Join
              onClose={() => setIsJoinOpen(false)}
              findId={() => setIsFindIdOpen(true)}
            />
          }
        />
      )}
      <div className="w-full max-w-lg mx-auto">
        <form action={action} className="w-full mt-32 px-8">
          <div className="flex flex-col justify-center items-center space-y-3">
            <h3 className="text-5xl xl:text-7xl font-extrabold text-emerald-700">
              memberee
            </h3>
            <h3 className="ml-3 text-black">
              누구나 편하게 쓰기 쉬운 회원관리
            </h3>
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
              maxLength={10}
              placeholder={"아이디"}
              className="h-1/2 rounded-t-xl"
              name="userid"
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
              name="password"
            />
          </div>
          {state?.fieldErrors && (
            <p className="text-orange-500 text-center mt-5">
              {(state?.fieldErrors?.userid &&
                state?.fieldErrors?.userid?.[0]) ||
                (state?.fieldErrors?.password &&
                  state?.fieldErrors?.password?.[0])}
            </p>
          )}
          <FormButton text={"로그인"} className="mt-10" />
          <div className="grid grid-cols-3 divide-x divide-gray-300 mt-5 text-gray-400 w-11/12 mx-auto *:text-center">
            <button onClick={() => setIsFindIdOpen(true)} type={"button"}>
              아이디 찾기
            </button>
            <div className="text-emerald-600 font-semibold">
              {/*<Link href={"/join"}>회원가입</Link>*/}
              <button onClick={() => setIsJoinOpen(true)} type={"button"}>
                회원가입
              </button>
            </div>
            <div>
              <button
                onClick={() => setIsFindPasswordOpen(true)}
                type={"button"}
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
