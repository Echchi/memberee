"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button";
import { format } from "date-fns";

const Page = () => {
  const today = format(new Date(), "yyyy. MM. dd.");
  const [selectedDay, setSelectedDay] = useState<string[]>(["월"]);
  const handleSelectDay = (day: string) => {
    if (selectedDay.includes(day)) {
      setSelectedDay((prev) => prev.filter((selected) => selected !== day));
    } else {
      if (selectedDay.length < 3) {
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
      <div className="py-3 col-span-2 border border-y-0 border-neutral-300 flex flex-col justify-center lg:pl-10 pl-4">
        <div className="flex min-h-32">
          <span className="hidden lg:flex items-center lg:text-lg flex-nowrap w-24 font-semibold text-stone-600">
            시간 선택
          </span>

          <div className="grid lg:grid-cols-7 grid-cols-4 justify-items-center py-3 w-full ">
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
                    "absolute -bottom-3 justify-center items-center",
                    selectedDay.includes(day) ? "flex" : "hidden",
                  )}
                >
                  <select className="outline-none bg-transparent text-xs xl:text-lg font-semibold">
                    <option>오전</option>
                    <option>오후</option>
                  </select>
                  <input
                    className="outline-none bg-transparent max-w-14 text-xs xl:text-lg font-semibold"
                    type="text"
                    placeholder={"09:00"}
                    maxLength={5}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Input
          type={"text"}
          label={"납부금액"}
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
