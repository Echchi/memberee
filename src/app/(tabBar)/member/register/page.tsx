"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";
import SelectTime, { ITime } from "@/component/page/member/register/selectTime";
import { TIME_REGEX, TIME_REGEX_ERROR } from "@/libs/regex";
import { useFormState } from "react-dom";
import { createMember } from "@/app/(tabBar)/member/register/action";
import { useRouter } from "next/navigation";
import { z } from "zod";
import WorkerList from "@/component/page/member/register/workerList";
import { createWorker } from "@/app/(tabBar)/worker/register/action";
import { DAYOFWEEK } from "@/libs/constants";

const Page = () => {
  const router = useRouter();
  const today = format(new Date(), "yyyyMMdd");
  const [selectedDay, setSelectedDay] = useState<number[]>([1]);
  const [selectedTime, setSelectedTime] = useState<ITime>({});
  const [timeError, setTimeError] = useState("");
  const handleSelectDay = (event: React.MouseEvent, dayIndex: number) => {
    event.preventDefault();
    if (selectedDay.includes(dayIndex)) {
      setSelectedDay((prev) =>
        prev.filter((selected) => selected !== dayIndex),
      );
      setSelectedTime((prev) => {
        const updatedTimes = { ...prev };
        delete updatedTimes[dayIndex]; // 해당 dayIndex 삭제
        return updatedTimes;
      });
    } else {
      if (selectedDay.length < 7) {
        setSelectedDay((prev) => [...prev, dayIndex]);
      } else {
        setSelectedDay((prev) => [...prev.slice(0, -1), dayIndex]);
      }
    }
  };

  const handleTimeChange = (
    day: number,
    type: "startTime" | "endTime",
    value: string,
  ) => {
    if (!TIME_REGEX.test(value)) {
      setTimeError(TIME_REGEX_ERROR);
    } else {
      setSelectedTime((prev) => ({
        ...prev,
        [day]: {
          // @ts-ignore
          ...prev[day],
          [type]: value,
        },
      }));
    }
  };
  const createMemberWithBulk = createMember.bind("bulk", false);
  const [state, action] = useFormState(createMemberWithBulk, null);
  return (
    <div className="max-w-screen-lg mx-auto xl:mt-10">
      <div className="col-span-2 border border-x border-b-0 flex bg-stone-100 text-stone-600 tracking-wider text-lg xl:text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
        회원 등록
      </div>
      <form className="xl:grid grid-cols-2" action={action}>
        <Input
          type={"text"}
          label={"이름"}
          placeholder={"이름"}
          className="h-16 xl:text-lg xl:border-r-0 border-b-0 "
          name={"name"}
          maxLength={6}
          minLength={2}
          required={true}
          errorMessage={state?.fieldErrors?.name}
        />
        <Input
          isLong={true}
          type={"text"}
          label={"연락처"}
          placeholder={"숫자만 입력해주세요"}
          className="h-16 xl:text-lg border-b-0"
          name={"phone"}
          maxLength={11}
          minLength={10}
          required={true}
          errorMessage={state?.fieldErrors?.phone}
        />
        <Input
          isLong={true}
          type={"text"}
          label={"생년월일"}
          placeholder={"20000726"}
          className="h-16 xl:text-lg xl:border-b-1 xl:border-r-0"
          maxLength={8}
          minLength={8}
          name={"birth"}
          errorMessage={state?.fieldErrors?.birth}
        />
        <Input
          type={"text"}
          label={"직업"}
          placeholder={"직업"}
          className="h-16 xl:text-lg border-b-1"
          name={"job"}
        />
        <div
          className={cls(
            "bg-white py-3 col-span-2 border border-t-0 border-b-1 border-neutral-300 flex flex-col xl:pl-10 pl-4",
            state?.fieldErrors?.dayOfWeek
              ? "!border-2 border-orange-500 animate-pulse"
              : "",
          )}
        >
          <div className="flex h-16">
            <span className="hidden xl:flex items-center xl:text-lg flex-nowrap w-24 font-semibold text-stone-600">
              요일 선택
            </span>

            <div className="relative grid grid-cols-7 justify-items-center xl:py-3 w-full px-4 overflow-y-auto xl:h-fit">
              {Object.entries(DAYOFWEEK).map(([index, day]) => (
                <div
                  key={`select_dayOFWeek_${day}`}
                  className="relative flex flex-col justify-center items-center text-base xl:text-lg *:xl:py-2 *:xl:px-4 *:transition-all *:py-1 *:px-2.5"
                >
                  <button
                    type={"button"}
                    className={cls(
                      "rounded-full text-stone-600",
                      selectedDay.includes(+index)
                        ? "ring-2 ring-inset ring-emerald-600 font-bold"
                        : "bg-transparent font-medium",
                    )}
                    onClick={(event: React.MouseEvent) =>
                      handleSelectDay(event, +index)
                    }
                  >
                    {day}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <input
          type={"text"}
          value={selectedDay.join("")}
          className="hidden"
          name={"dayOfWeek"}
          readOnly
        />
        {selectedDay.length > 0 && (
          <SelectTime
            selectedDay={selectedDay}
            handleTimeChange={handleTimeChange}
            timeError={timeError}
            setTimeError={setTimeError}
          />
        )}
        <input
          type={"text"}
          value={JSON.stringify(selectedTime)}
          className="hidden"
          required={true}
          name={"times"}
          readOnly
        />
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
                수업료
              </span>
            }
            placeholder={formatCurrency("250000")}
            className="h-16 xl:text-lg border-y-0"
            name={"lessonFee"}
            maxLength={7}
            minLength={4}
            required={true}
            errorMessage={state?.fieldErrors?.lessonFee}
          />
        </div>
        <WorkerList selectedDay={selectedDay} />
        <Input
          type={"text"}
          label={"시작 일자"}
          placeholder={today}
          value={today}
          className="h-16 xl:text-lg xl:border-l-0"
          name={"startDate"}
          maxLength={8}
          minLength={8}
          required={true}
          errorMessage={state?.fieldErrors?.startDate}
        />
        <div className="col-span-2">
          <Input
            type={"text"}
            label={"비고"}
            placeholder={"처음 시작하는 회원"}
            isLong={true}
            className="h-16 xl:text-lg rounded-b-xl border-t-0"
            name={"content"}
            errorMessage={state?.fieldErrors?.content}
          />
        </div>
        <div className="col-span-2 flex justify-end space-x-3 mt-4">
          <Button
            onClick={() => router.push("/member")}
            text={"취소"}
            type="button"
            className="!w-1/6 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
          />

          <Button
            text={"등록"}
            isButtonDisabled={!!timeError}
            className="!w-1/6"
            large={true}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
