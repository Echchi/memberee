"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";
import { createWorker } from "@/app/(tabBar)/worker/register/action";
import { useFormState, useFormStatus } from "react-dom";
import { DAYOFWEEK } from "@/libs/constants";
import SelectWorkingDay from "@/component/worker/workingDay";

const Page = () => {
  const today = format(new Date(), "yyyyMMdd");
  const [selectedDay, setSelectedDay] = useState<number[]>([1]);
  const handleSelectDay = (dayIndex: number) => {
    if (selectedDay.includes(dayIndex)) {
      setSelectedDay((prev) =>
        prev.filter((selected) => selected !== dayIndex),
      );
    } else {
      setSelectedDay((prev) => [...prev, dayIndex]);
    }
  };

  const [state, action] = useFormState(createWorker, null);

  return (
    <form className="grid grid-cols-2" action={action}>
      <Input
        type={"text"}
        label={"이름"}
        placeholder={"이름"}
        className="h-14 lg:text-lg border-r-0 border-b-0 rounded-tl-lg"
        name={"name"}
        maxLength={6}
        minLength={2}
        required={true}
        errorMessage={state?.fieldErrors.name}
      />
      <Input
        isLong={true}
        type={"text"}
        label={"연락처"}
        placeholder={"01012341234"}
        className="h-14 lg:text-lg border-b-0 rounded-tr-lg"
        name={"phone"}
        maxLength={11}
        minLength={10}
        required={true}
        errorMessage={state?.fieldErrors.phone}
      />
      <Input
        isLong={true}
        type={"text"}
        label={"생년월일"}
        placeholder={"20000726"}
        className="h-14 lg:text-lg border-b-0 border-r-0"
        name={"birth"}
        maxLength={8}
        minLength={8}
        required={true}
        errorMessage={state?.fieldErrors.birth}
      />
      <Input
        type={"text"}
        label={"시작일자"}
        value={today}
        placeholder={today}
        className="h-14 lg:text-lg border-b-0"
        name={"startDate"}
        maxLength={8}
        minLength={8}
        required={true}
        errorMessage={state?.fieldErrors.startDate}
      />
      <SelectWorkingDay
        selectedDay={selectedDay}
        handleSelectDay={handleSelectDay}
      />

      <input
        type={"text"}
        value={selectedDay.join("")}
        className="hidden"
        name={"dayOfWeek"}
      />
      <div className="col-span-2">
        <Input
          type={"number"}
          label={"수수료"}
          placeholder={"10"}
          className="h-14 lg:text-lg border-b-1"
          name={"commission"}
          maxLength={2}
          errorMessage={state?.fieldErrors.commission}
        />
      </div>
      <Input
        type={"text"}
        label={"은행"}
        placeholder={"국민"}
        className="h-14 lg:text-lg border-t-0 border-r-0"
        name={"bank"}
        maxLength={8}
      />
      <Input
        type={"text"}
        label={"계좌번호"}
        placeholder={"12312312123123"}
        isLong={true}
        className="h-14 lg:text-lg  border-t-0"
        name={"accountNumber"}
        maxLength={15}
        errorMessage={state?.fieldErrors.accountNumber}
      />
      <div className="col-span-2">
        <Input
          type={"text"}
          label={"비고"}
          placeholder={""}
          isLong={true}
          className="h-14 lg:text-lg rounded-b-lg border-t-0"
          name={"content"}
          errorMessage={state?.fieldErrors.content}
        />
      </div>
      <div className="col-span-2 flex justify-between space-x-10">
        <Button text={"등록"} className="mt-4" large={true} />
      </div>
    </form>
  );
};

export default Page;
