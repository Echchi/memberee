"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";

const Page = () => {
  const today = format(new Date(), "yyyy. MM. dd.");
  const [selectedDay, setSelectedDay] = useState<string[]>(["월"]);
  const handleSelectDay = (day: string) => {
    if (selectedDay.includes(day)) {
      setSelectedDay((prev) => prev.filter((selected) => selected !== day));
    } else {
      if (selectedDay.length < 7) {
        setSelectedDay((prev) => [...prev, day]);
      } else {
        setSelectedDay((prev) => [...prev.slice(0, -1), day]);
      }
    }
  };

  return (
    <div className="grid grid-cols-2">
      <Input
        type={"text"}
        label={"이름"}
        placeholder={"이름"}
        className="h-14 lg:text-lg border-r-0 border-b-0 rounded-tl-lg"
        name={"name"}
      />
      <Input
        isLong={true}
        type={"text"}
        label={"연락처"}
        placeholder={"숫자만 입력해주세요"}
        className="h-14 lg:text-lg border-b-0 rounded-tr-lg"
        name={"phone"}
      />
      <Input
        isLong={true}
        type={"text"}
        label={"생년월일"}
        placeholder={"여덟자리 숫자로 입력해주세요"}
        className="h-14 lg:text-lg border-b-1 border-r-0"
        name={"birth"}
      />
      <Input
        type={"text"}
        label={"직업"}
        placeholder={"직업"}
        className="h-14 lg:text-lg border-b-1"
        name={"job"}
      />
      <div className="py-3 col-span-2 border border-y-0 border-neutral-300 flex flex-col justify-center lg:pl-10 pl-4">
        <div className="flex min-h-44">
          <span className="hidden lg:flex items-center lg:text-lg flex-nowrap w-24 font-semibold text-stone-600">
            시간 선택
          </span>

          <div className="grid lg:grid-cols-7 grid-cols-4 justify-items-center py-3 w-full px-4">
            {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-center items-center text-lg *:py-2 *:px-4 *:trnsition-all py-4 lg:py-0"
              >
                <button
                  className={cls(
                    "rounded-full text-stone-600",
                    selectedDay.includes(day)
                      ? "ring-2 ring-inset ring-emerald-600 font-bold"
                      : "bg-transparent font-medium",
                  )}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </button>
                <div
                  className={cls(
                    "absolute -bottom-4 justify-center items-center",
                    selectedDay.includes(day) ? "flex flex-col" : "hidden",
                  )}
                >
                  <div className="flex">
                    <select
                      data-testid="select"
                      className="outline-none bg-transparent text-xs xl:text-lg font-medium text-stone-600"
                    >
                      <option data-testid="select-option">오전</option>
                      <option data-testid="select-option">오후</option>
                    </select>
                    <input
                      className="outline-none bg-transparent max-w-14 text-xs xl:text-lg font-medium"
                      type="text"
                      placeholder={"09:00"}
                      maxLength={5}
                    />
                  </div>
                  <div className="flex">
                    <select
                      data-testid="select"
                      className="outline-none bg-transparent text-xs xl:text-lg font-medium text-stone-600"
                    >
                      <option data-testid="select-option">오전</option>
                      <option data-testid="select-option">오후</option>
                    </select>
                    <input
                      className="outline-none bg-transparent max-w-14 text-xs xl:text-lg font-medium"
                      type="text"
                      placeholder={"10:00"}
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Input
          type={"text"}
          label={
            <span className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 text-stone-400 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              납부금액
            </span>
          }
          placeholder={formatCurrency("250000")}
          className="h-14 lg:text-lg border-b-0"
        />
      </div>
      <Input
        type={"text"}
        label={"담당"}
        placeholder={formatCurrency("이코치")}
        className="h-14 lg:text-lg border-b-1"
      />
      <Input
        type={"text"}
        label={"시작 일자"}
        placeholder={today}
        className="h-14 lg:text-lg border-b-1 border-l-0"
      />
      <div className="col-span-2">
        <Input
          type={"text"}
          label={"비고"}
          placeholder={"국민은행 000-000-00-000000"}
          isLong={true}
          className="h-14 lg:text-lg rounded-b border-t-0"
        />
      </div>
      <div className="col-span-2 flex justify-between space-x-10">
        <Button text={"등록"} className="mt-4" large={true} />
      </div>
    </div>
  );
};

export default Page;
