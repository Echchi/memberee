"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";
import { createWorker } from "@/app/(tabBar)/worker/register/action";
import { useFormState } from "react-dom";

const Page = () => {
  const today = format(new Date(), "yyyy. MM. dd.");
  const [selectedDay, setSelectedDay] = useState<string[]>(["월"]);
  const handleSelectDay = (day: string) => {
    if (selectedDay.includes(day)) {
      setSelectedDay((prev) => prev.filter((selected) => selected !== day));
    } else {
      setSelectedDay((prev) => [...prev, day]);
    }
  };

  const [state, dispatch] = useFormState(createWorker, null);

  return (
    <form className="grid grid-cols-2" action={dispatch}>
      <Input
        type={"text"}
        label={"이름"}
        placeholder={"이름"}
        className="h-14 lg:text-lg border-r-0 border-b-0 rounded-tl-lg"
        name={"name"}
        maxLength={6}
        minLength={2}
        required={true}
      />
      <Input
        isLong={true}
        type={"text"}
        label={"연락처"}
        placeholder={"숫자만 입력해주세요"}
        className="h-14 lg:text-lg border-b-0 rounded-tr-lg"
        name={"phone"}
        maxLength={11}
        required={true}
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
        label={"시작일자"}
        placeholder={today}
        className="h-14 lg:text-lg border-b-1"
        name={"startDate"}
      />
      <div className="py-3 col-span-2 border border-y-0 border-neutral-300 flex flex-col justify-center lg:pl-10 pl-4">
        <div className="flex 16">
          <span className="hidden lg:flex items-center lg:text-lg flex-nowrap w-24 font-semibold text-stone-600">
            요일 선택
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
                  type={"button"}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Input
          type={"text"}
          label={"수수료"}
          placeholder={"10%"}
          className="h-14 lg:text-lg border-b-1"
          name={"commission"}
        />
      </div>
      <Input
        type={"text"}
        label={"은행"}
        placeholder={"국민"}
        className="h-14 lg:text-lg border-t-0 border-r-0"
        name={"bank"}
      />
      <Input
        type={"text"}
        label={"계좌번호"}
        placeholder={"000-000-00-000000"}
        isLong={true}
        className="h-14 lg:text-lg  border-t-0"
        name={"accountNumber"}
      />
      <div className="col-span-2">
        <Input
          type={"text"}
          label={"비고"}
          placeholder={""}
          isLong={true}
          className="h-14 lg:text-lg rounded-b border-t-0"
          name={"content"}
        />
      </div>
      <div className="col-span-2 flex justify-between space-x-10">
        <Button text={"등록"} className="mt-4" large={true} />
      </div>
    </form>
  );
};

export default Page;
