import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import Button from "@/component/button/button";
import { checkPassword, updatePassword } from "@/app/(tabBar)/account/api";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";

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
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    // console.log("error", error);
  }, [error]);
  const handleCheckCurrentPwd = async () => {
    if (currentPwd.length > 0) {
      setError((prev) => ({
        ...prev,
        currentPwd: "",
      }));
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
    } else {
      setError((prev) => ({
        ...prev,
        confirmNewPwd: "새 비밀번호를 다시 한 번 입력해주세요",
      }));
    }
  };

  const handleUpdatePassword = async () => {
    const result = await updatePassword(newPwd);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError((prev) => ({
        ...prev,
        newPwd: "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
      }));
    }
  };

  return (
    <>
      <>
        {!isSuccess && (
          <div className="absolute right-0 h-3/4 w-full flex justify-center items-center bg-white z-20">
            <p className="text-xl lg:text-3xl text-green-700 font-bold">
              변경 완료
            </p>
          </div>
        )}
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
          onClick={handleUpdatePassword}
        />
      </>
    </>
  );
};

export default ChangePassword;
