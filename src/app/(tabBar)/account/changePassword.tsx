import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { createPay } from "@/app/(tabBar)/pay/[id]/api";
import Button from "@/component/button/button";
import { checkPassword, updatePassword } from "@/app/(tabBar)/account/api";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";
import bcrypt from "bcrypt";

const ChangePassword = () => {
  const [error, setError] = useState({
    currentPwd: "",
    checkCurrentPwd: false,
    newPwd: "",
    confirmNewPwd: "",
    checkConfirmCurrentPwd: false,
  });
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  useEffect(() => {
    console.log("error", error);
  }, [error]);
  const handleCheckCurrentPwd = async () => {
    if (currentPwd.length > 0) {
      setError((prev) => ({
        ...prev,
        currentPwd: "",
      }));
      // 비밀번호 확인
      // 일치하지 않습니다
      // 일치합니당
      const result = await checkPassword(currentPwd);
      if (!result) {
        setError((prev) => ({
          ...prev,
          currentPwd: "비밀번호가 일치하지 않아요",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          checkCurrentPwd: true,
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        currentPwd: "현재 비밀번호를 입력해주세요",
      }));
    }
  };
  const handleChangeNewPwd = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        newPwd: "",
      }));

      if (PASSWORD_REGEX.test(value)) {
        setNewPwd(value);
      } else {
        setError((prev) => ({
          ...prev,
          newPwd: PASSWORD_REGEX_ERROR,
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        newPwd: "새 비밀번호를 입력해주세요",
      }));
    }
  };
  const handleChangeNewConfirmPwd = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        confirmNewPwd: "",
      }));
      if (value !== newPwd) {
        setError((prev) => ({
          ...prev,
          confirmNewPwd: "새 비밀번호와 일치하지 않아요",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          checkConfirmCurrentPwd: true,
        }));
      }
      // 일치하는지 확인
      // 일치 안하면 error -> 일치하지 않습니다
      // 일치하면 error 삭제
    } else {
      setError((prev) => ({
        ...prev,
        confirmNewPwd: "새 비밀번호를 다시 한 번 입력해주세요",
      }));
    }
  };
  return (
    <>
      <Input
        type={"password"}
        label={"현재 비밀번호"}
        placeholder={"현재 비밀번호"}
        className="h-16 lg:text-lg border-b-0 rounded-t-lg"
        onBlur={handleCheckCurrentPwd}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentPwd(event.target.value)
        }
        isLong={true}
        required={true}
        errorMessage={
          error?.currentPwd.length > 0 ? [error?.currentPwd] : undefined
        }
      />
      <Input
        type={"password"}
        label={"새 비밀번호"}
        placeholder={"새 비밀번호"}
        className="h-16 lg:text-lg border-b-0"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeNewPwd(event)
        }
        isLong={true}
        required={true}
        errorMessage={error?.newPwd.length > 0 ? [error?.newPwd] : undefined}
      />
      <Input
        type={"password"}
        label={"새 비밀번호 확인"}
        placeholder={"새 비밀번호 확인"}
        className="h-16 lg:text-lg rounded-b-lg"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeNewConfirmPwd(event)
        }
        isLong={true}
        required={true}
        errorMessage={
          error.confirmNewPwd.length > 0 ? [error?.confirmNewPwd] : undefined
        }
      />
      <Button
        text={"등록"}
        className="mt-4"
        large={true}
        isButtonDisabled={
          !error.checkCurrentPwd ||
          !error.checkConfirmCurrentPwd ||
          error.currentPwd.length > 0 ||
          error.newPwd.length > 0 ||
          error.confirmNewPwd.length > 0 ||
          newPwd.length === 0
        }
        onClick={() => updatePassword(newPwd)}
      />
    </>
  );
};

export default ChangePassword;
