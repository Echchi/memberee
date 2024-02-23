"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button";

const Page = () => {
  const [selectedDay, setSelectedDay] = useState<string[]>(["0"]);
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
      <div className="col-span-2 h-24 border border-y-0 border-neutral-300 flex flex-col justify-center lg:pl-10 pl-4">
        <div className="flex">
          <span className="flex items-center lg:text-lg text-base font-bold text-stone-600">
            요일 선택
          </span>
          <div className="grow flex justify-center items-center">
            <div className="px-10 py-3 w-fit space-x-10 text-lg *:py-2 *:px-4 *:trnsition-all">
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("0")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("0")}
              >
                월
              </button>
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("1")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("1")}
              >
                화
              </button>
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("2")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("2")}
              >
                수
              </button>
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("3")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("3")}
              >
                목
              </button>
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("4")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("4")}
              >
                금
              </button>
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("5")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("5")}
              >
                토
              </button>
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes("6")
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                onClick={() => handleSelectDay("6")}
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
        className="h-14 lg:text-lg rounded-br-lg border-l-0"
      />
      <Button text={"등록"} className="mt-4" large={true} />
    </div>
  );
};

export default Page;
