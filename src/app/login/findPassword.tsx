import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import Button from "@/component/button/button";
import {
  CO_NUM_REGEX,
  CO_NUM_REGEX_ERROR,
  PHONE_REGEX_ERROR,
} from "@/libs/constants";
import {
  getUserWithData,
  getUserWithId,
  sendPasswordEmail,
} from "@/app/login/api";
import validator from "validator";
import { generateTemporaryPassword } from "@/libs/client/utils";
import FindPasswordEmail from "../../../emails/find-password-email";
import { updatePassword } from "@/app/(tabBar)/account/api";

export interface FindPasswordRes {
  name: string;
  userid: string;
  email: string;
}

const FindPassword = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState({
    id: "",
    phone: "",
    coNum: "",
    result: "",
  });
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [coNum, setCoNum] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<FindPasswordRes>({
    name: "",
    userid: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckId = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        id: "",
      }));
      const result = await getUserWithId(id);
      if (!result) {
        setError((prev) => ({
          ...prev,
          id: "아이디를 다시 확인해주세요",
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        id: "아이디를 입력해주세요",
      }));
    }
  };
  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        phone: "",
        result: "",
      }));

      if (validator.isMobilePhone(value, "ko-KR")) {
        setPhone(value);
      } else {
        setError((prev) => ({
          ...prev,
          phone: PHONE_REGEX_ERROR,
          result: "",
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        phone: "연락처를 입력해주세요",
      }));
    }
  };
  const handleChangeCoNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        coNum: "",
        result: "",
      }));
      if (CO_NUM_REGEX.test(value)) {
        setCoNum(value);
      } else {
        setError((prev) => ({
          ...prev,
          coNum: CO_NUM_REGEX_ERROR,
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        coNum: "사업자등록번호를 입력해주세요",
      }));
    }
  };

  const handleFindPassword = async () => {
    setIsLoading(true);
    const parma = {
      id,
      coNum,
      phone,
    };

    const result = await getUserWithData(parma);

    if (result) {
      setResult(result);

      // 임시 비밀번호 생성
      const tmpPassword = generateTemporaryPassword();

      // 임시 비밀번호로 변경
      const changeResult = await updatePassword(tmpPassword, id);
      if (changeResult) {
        // 임시 비밀번호 메일 전송
        const param = {
          email: result.email,
          name: result.name,
          tmpPassword,
        };

        const res = await sendPasswordEmail(param);
        if (res.success) {
          setIsSuccess(true);
          setError((prev) => ({
            ...prev,
            result: "",
          }));
        } else {
          setIsSuccess(false);
          setError((prev) => ({
            ...prev,
            result: "잠시 뒤에 다시 시도해주세요!",
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          result: "잠시 뒤에 다시 시도해주세요!",
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        result: "일치하는 계정이 없어요. 다시 확인해주세요.",
      }));
    }
    setIsLoading(false);
  };

  return (
    <>
      <>
        {isSuccess && (
          <div className="absolute right-0 h-4/5 w-full flex flex-col justify-center items-center bg-white z-20 px-10 pb-10">
            <p className="text-lg font-medium">
              {result.name} 님의 이메일로 임시 비밀번호를 보냈어요!
            </p>
            <p className="mb-7">
              스펨 메일함에 있을 수도 있어요. 스펨 메일함도 확인해주세요.
            </p>
            <div className="bg-gray-100 rounded-lg w-full py-6 text-lg font-semibold text-center">
              {result.email}
            </div>
          </div>
        )}
        <Input
          type={"userid"}
          label={"아이디"}
          placeholder={"아이디"}
          maxLength={10}
          className="h-16 xl:text-lg border-b-0 rounded-t-lg"
          onBlur={handleCheckId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setId(event.target.value)
          }
          isLong={true}
          required={true}
          errorMessage={error?.id.length > 0 ? [error?.id] : undefined}
        />
        <Input
          type={"연락처"}
          label={"연락처"}
          placeholder={"연락처"}
          className="h-16 xl:text-lg border-b-0"
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangePhone(event)
          }
          isLong={true}
          required={true}
          maxLength={11}
          errorMessage={error?.phone.length > 0 ? [error?.phone] : undefined}
        />
        <Input
          type={"사업자등록번호"}
          label={"사업자등록번호"}
          placeholder={"사업자등록번호"}
          className="h-16 xl:text-lg rounded-b-lg"
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeCoNum(event)
          }
          isLong={true}
          required={true}
          maxLength={10}
          errorMessage={error.coNum.length > 0 ? [error?.coNum] : undefined}
        />
        <p className="text-orange-500 pt-3 font-semibold">{error.result}</p>
        <Button
          text={isLoading ? "찾는 중" : "비밀번호 찾기"}
          className="mt-4"
          large={true}
          isButtonDisabled={
            error.id.length > 0 ||
            error.phone.length > 0 ||
            error.coNum.length > 0 ||
            isSuccess ||
            isLoading
          }
          onClick={handleFindPassword}
        />
      </>
    </>
  );
};

export default FindPassword;
