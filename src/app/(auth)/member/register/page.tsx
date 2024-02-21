"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button";

const Page = () => {
  const [selectedDay, setSelectedDat] = useState("0");
  return (
    <div className="grid grid-cols-2">
      <Input
        type={"text"}
        label={"이름"}
        placeholder={"이름"}
        className="h-14 lg:text-lg border-r-0 border-b-0 rounded-tl-lg"
      />
      <Input
        isLong={true}
        type={"text"}
        label={"연락처"}
        placeholder={"숫자만 입력해주세요"}
        className="h-14 lg:text-lg border-b-0 rounded-tr-lg"
      />
      <Input
        isLong={true}
        type={"text"}
        label={"생년월일"}
        placeholder={"여덟자리 숫자로 입력해주세요"}
        className="h-14 lg:text-lg border-b-1 border-r-0"
      />
      <Input
        type={"text"}
        label={"직업"}
        placeholder={"직업"}
        className="h-14 lg:text-lg border-b-1"
      />
      <div className="col-span-2 h-24 border border-y-0 border-neutral-300 flex flex-col justify-center lg:pl-10 pl-4">
        <div className="flex">
          <span className="flex items-center lg:text-lg text-base font-semibold text-stone-600">
            요일 선택
          </span>
          <div className="grow flex justify-center items-center">
            <div className="bg-emerald-600 rounded-full px-7 py-3 w-fit space-x-10 text-lg *:py-2 *:px-3 *:shadow *:font-medium">
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "0"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                월
              </button>
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "1"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                화
              </button>
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "2"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                수
              </button>
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "3"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                목
              </button>
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "4"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                금
              </button>
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "5"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                토
              </button>
              <button
                className={cls(
                  "rounded-full",
                  selectedDay === "6"
                    ? "bg-white text-stone-600"
                    : "bg-transparent text-white",
                )}
              >
                일
              </button>
            </div>
          </div>
        </div>
      </div>
      <Input
        type={"text"}
        label={"납부금액"}
        placeholder={formatCurrency("250000")}
        className="h-14 lg:text-lg border-b-1"
      />
      <Input
        type={"text"}
        label={"메모"}
        placeholder={"국민은행 000-000-00-000000"}
        className="h-14 lg:text-lg rounded-b-lg"
      />
      <Button text={"등록"} className="mt-4" large={true} />
    </div>
  );
};

export default Page;
