"use client";
import React, { useEffect, useState } from "react";
import { checkPasswordStrength, cls } from "../../../libs/client/utils";
import { PASSWORD_REGEX_ERROR } from "../../../libs/regex";

const PasswordStrength = ({ password }: { password: string }) => {
  const [level, setLevel] = useState(0);
  useEffect(() => {
    const result = checkPasswordStrength(password);
    setLevel(result);
  }, [password]);
  const passwordMsg = (level: number) => {
    let result;
    if (0 === level) {
      result = "";
    } else if (level < 3) {
      result = "위험한 비밀번호";
    } else if (level < 5) {
      result = "약간 위험한 비밀번호";
    } else {
      result = "안전한 비밀번호";
    }
    return result;
  };
  return (
    <div className="flex items-center w-full justify-end">
      <span
        className={cls(
          "text-sm md:text-base mr-3 font-semibold",
          level === 0
            ? "text-gray-500"
            : level < 3
              ? "text-orange-500"
              : level < 5
                ? "text-amber-600"
                : "text-green-600",
        )}
      >
        {passwordMsg(level)}
      </span>
      <div className="flex w-1/4 space-x-1 *:h-3 *:md:h-5 *:w-full">
        <div
          className={cls(
            "rounded-l-full",
            level === 0
              ? "bg-gray-200"
              : level < 3
                ? "bg-orange-500"
                : level < 5
                  ? "bg-amber-600"
                  : "bg-green-600",
          )}
        />
        <div
          className={cls(
            level === 0
              ? "bg-gray-200"
              : level < 3
                ? "bg-gray-200"
                : level < 5
                  ? "bg-amber-600"
                  : "bg-green-600",
          )}
        />
        <div
          className={cls(
            "rounded-r-full",
            level === 0
              ? "bg-gray-200"
              : level < 5
                ? "bg-gray-200"
                : "bg-green-600",
          )}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;
