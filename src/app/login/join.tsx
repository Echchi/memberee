import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import Button from "@/component/button/button";
import {
  CO_NUM_REGEX,
  CO_NUM_REGEX_ERROR,
  PHONE_REGEX_ERROR,
} from "@/libs/regex";
import {
  getUserWithData,
  getUserWithId,
  sendPasswordEmail,
} from "@/app/login/api";
import validator from "validator";
import { generateTemporaryPassword } from "@/libs/client/utils";
import FindPasswordEmail from "../../../emails/find-password-email";
import {
  checkEmail,
  checkTmpEmail,
  updatePassword,
} from "@/app/(tabBar)/account/api";
export interface ITmpEmail {
  id?: number;
  email: string;
  token: string;
  expiresAt: number;
}
const Join = ({
  onClose,
  findId,
}: {
  onClose: () => void;
  findId?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState({
    result: "",
    email: "",
  });
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        result: "",
        email: "",
      }));
      if (validator.isEmail(value)) {
        setEmail(value);
      } else {
        setError((prev) => ({
          ...prev,
          email: "이메일을 올바르게 입력해주세요",
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        email: "이메일을 입력해주세요",
      }));
    }
  };

  const handleClickSendBtn = async () => {
    setIsLoading(true);
    console.log("email", email);
    // 기존 회원 테이블에 해당 이메일이 있는지 확인
    const isExist = await checkEmail(email);
    // 있음 -> serError result -> 아이디 찾기로 이동
    if (isExist) {
      setError((prev) => ({ ...prev, result: "이미 존재하는 이메일이에요" }));
      setIsLoading(false);
      return;
    }

    // 없음
    // 임시 이메일 테이블에 해당 이메일이 있는지 확인
    const tmpEmail = await checkTmpEmail(email);
    // 있음 -> 유효기간 확인

    // 유효기간 지남 -> 새 토큰 생성 update -> 이메일 전송

    // 유효기간 안지남 -> 이메일 전송

    // 없음 -> 이메일, 토큰, 유효기간 삽입

    // const result = await getUserWithData(parma);
    //
    // if (result) {
    //   setResult(result);
    //
    //   // 임시 비밀번호 생성
    //   const tmpPassword = generateTemporaryPassword();
    //
    //   // 임시 비밀번호로 변경
    //   const changeResult = await updatePassword(tmpPassword, id);
    //   if (changeResult) {
    //     // 임시 비밀번호 메일 전송
    //     const param = {
    //       email: result.email,
    //       name: result.name,
    //       tmpPassword,
    //     };
    //
    //     const res = await sendPasswordEmail(param);
    //     if (res.success) {
    //       setIsSuccess(true);
    //       setError((prev) => ({
    //         ...prev,
    //         result: "",
    //       }));
    //     } else {
    //       setIsSuccess(false);
    //       setError((prev) => ({
    //         ...prev,
    //         result: "잠시 뒤에 다시 시도해주세요!",
    //       }));
    //     }
    //   } else {
    //     setError((prev) => ({
    //       ...prev,
    //       result: "잠시 뒤에 다시 시도해주세요!",
    //     }));
    //   }
    // } else {
    //   setError((prev) => ({
    //     ...prev,
    //     result: "일치하는 계정이 없어요. 다시 확인해주세요.",
    //   }));
    // }
    setIsLoading(false);
  };
  const handleClickFindId = () => {
    onClose();
    findId && findId();
  };
  return (
    <>
      <>
        {isSuccess && (
          <div className="absolute right-0 h-4/5 w-full flex flex-col justify-center items-center bg-white z-20 px-10 pb-10">
            <p className="text-lg font-medium">
              아래의 이메일로 인증 메일을 보냈어요!
            </p>
            <p className="mb-7">
              스펨 메일함에 있을 수도 있어요. 스펨 메일함도 확인해주세요.
            </p>
            <div className="bg-gray-100 rounded-lg w-full py-6 text-lg font-semibold text-center">
              {result}
            </div>
          </div>
        )}
        {!isSuccess && (
          <>
            <p className="text-lg font-medium text-center">
              인증 메일을 받을 이메일을 입력해주세요
            </p>
            <p className="text-sm font-medium text-center pb-3">
              비밀번호 찾기나 중요 정보를 전달할 때 쓰기 때문에 확인이 필요해요
            </p>
            <Input
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              }
              type={"text"}
              placeholder={"이메일"}
              required={true}
              className={"h-16  rounded-lg"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeEmail(event)
              }
              errorMessage={
                error?.email.length > 0 ? [error?.email] : undefined
              }
            />
            <p className="w-full flex justify-between text-orange-500 pt-3 font-semibold">
              {error.result && (
                <>
                  <p>{error.result}</p>
                  <p
                    className="text-emerald-700 cursor-pointer"
                    onClick={() => handleClickFindId()}
                  >
                    아이디를 찾아볼까요?
                  </p>
                </>
              )}
            </p>
            <Button
              text={isLoading ? "보내는 중" : "인증 메일 보내기"}
              className="mt-4"
              large={true}
              isButtonDisabled={
                error.email.length > 0 ||
                error.result.length > 0 ||
                isSuccess ||
                isLoading
              }
              onClick={handleClickSendBtn}
            />
          </>
        )}
      </>
    </>
  );
};

export default Join;
