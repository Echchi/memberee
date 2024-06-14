import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import Button from "@/component/button/button";
import { checkPassword, updatePassword } from "@/app/(tabBar)/account/api";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  console.log("onClose", typeof onClose);
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

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <>
      <>
        {isSuccess && (
          <div className="absolute right-0 h-3/4 w-full flex flex-col justify-center items-center bg-white z-20 space-y-4">
            <svg width="50" height="50" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgb(21, 128, 61)"
                strokeWidth="7"
              />
              <path
                d="M30 50 L45 65 L70 35"
                fill="none"
                stroke="rgb(21, 128, 61)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0, 100"
                  to="100, 0"
                  dur="0.5s"
                  fill="freeze"
                />
              </path>
            </svg>
            <p className="text-base xl:text-lg text-green-700 font-bold">
              비밀번호 변경이 완료되었습니다
            </p>
          </div>
        )}
        <Input
          type={"password"}
          label={"현재 비밀번호"}
          placeholder={"현재 비밀번호"}
          className="h-16 xl:text-lg border-b-0 rounded-t-lg"
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
          className="h-16 xl:text-lg border-b-0"
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
          className="h-16 xl:text-lg rounded-b-lg"
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
