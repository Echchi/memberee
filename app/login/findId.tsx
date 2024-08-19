import React, { useEffect, useState } from "react";
import Input from "../../component/input";
import Button from "../../component/button/button";
import {
  CO_NUM_REGEX,
  CO_NUM_REGEX_ERROR,
  NAME_REGEX,
  NAME_REGEX_ERROR,
  PHONE_REGEX_ERROR,
} from "../../libs/regex";
import { getUserWithData } from "./api";
import validator from "validator";
import { format, formatDate } from "date-fns";

export interface FindIdRes {
  userid: string;
  createdAt: Date;
}

const FindId = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState({
    name: "",
    phone: "",
    coNum: "",
    result: "",
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coNum, setCoNum] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState<FindIdRes>({
    userid: "",
    createdAt: new Date(),
  });

  const handleCheckName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        name: "",
      }));
      if (NAME_REGEX.test(name)) {
        setName(value);
      } else {
        setError((prev) => ({
          ...prev,
          name: NAME_REGEX_ERROR,
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        name: "이름을 입력해주세요",
      }));
    }
  };
  const handleChangePhone = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const handleFindId = async () => {
    const param = {
      coNum,
      phone,
    };
    const result = await getUserWithData(param);
    if (result) {
      setResult(result);
      setIsSuccess(true);
    } else {
      setError((prev) => ({
        ...prev,
        result: "일치하는 계정이 없습니다. 정보를 다시 확인해주세요.",
      }));
    }
  };

  return (
    <>
      <>
        {isSuccess && (
          // <div className="absolute right-0 h-3/4 w-full flex flex-col justify-center items-center bg-white z-20 px-10 pb-10">
          <div className="h-full w-full flex flex-col justify-center items-center bg-white z-20 px-4 pb-10">
            <p className="text-xl font-medium mb-6">
              {name} 님의 아이디를 찾았어요!
            </p>
            <Input
              type={"div"}
              label={"아이디"}
              className="h-16 xl:text-lg border-b-0 rounded-t-lg"
              value={result.userid}
            />
            <Input
              type={"div"}
              label={"가입일"}
              className="h-16 xl:text-lg rounded-b-lg"
              value={formatDate(result.createdAt, "yyyy년 MM월 dd일")}
            />
          </div>
        )}
        {!isSuccess && (
          <>
            <Input
              type={"name"}
              label={"이름"}
              placeholder={"이름"}
              className="h-16 xl:text-lg border-b-0 rounded-t-lg"
              onBlur={handleCheckName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              isLong={true}
              required={true}
              errorMessage={error?.name.length > 0 ? [error?.name] : undefined}
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
              errorMessage={
                error?.phone.length > 0 ? [error?.phone] : undefined
              }
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
              text={"아이디 찾기"}
              className="mt-4"
              large={true}
              isButtonDisabled={
                error.name.length > 0 ||
                error.phone.length > 0 ||
                error.coNum.length > 0 ||
                isSuccess
              }
              onClick={handleFindId}
            />
          </>
        )}
      </>
    </>
  );
};

export default FindId;
