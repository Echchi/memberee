"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../../component/input";
import Button from "../../../../component/button/button";
import { format } from "date-fns";
import { useFormState } from "react-dom";
import SelectWorkingDay from "../../../../component/page/worker/workingDay";
import { createWorker } from "./action";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const today = format(new Date(), "yyyyMMdd");
  const [selectedDay, setSelectedDay] = useState<number[]>([1]);
  const handleSelectDay = (event: React.MouseEvent, dayIndex: number) => {
    event.preventDefault();
    if (selectedDay.includes(dayIndex)) {
      setSelectedDay((prev) =>
        prev.filter((selected) => selected !== dayIndex),
      );
    } else {
      setSelectedDay((prev) => [...prev, dayIndex]);
    }
  };

  const createWorkerWithBulk = createWorker.bind("bulk", false);
  const [state, action] = useFormState(createWorkerWithBulk, null);

  return (
    <div className="max-w-screen-lg mx-auto xl:mt-7 xl:p-4 rounded-lg bg-white">
      <div className="col-span-2 border border-x border-b-0 flex bg-stone-100 text-stone-600 tracking-wider text-lg xl:text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
        직원 등록
      </div>
      <form className="xl:grid grid-cols-2" action={action}>
        <Input
          isLong={true}
          type={"text"}
          label={"이름"}
          placeholder={"이름"}
          className="h-16 xl:text-lg xl:border-r-0 border-b-0"
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
          placeholder={"01012341234"}
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
          className="h-16 xl:text-lg border-b-0 xl:border-r-0"
          name={"birth"}
          maxLength={8}
          minLength={8}
          required={true}
          errorMessage={state?.fieldErrors?.birth}
        />
        <Input
          isLong={true}
          type={"text"}
          label={"시작일자"}
          value={today}
          placeholder={today}
          className="h-16 xl:text-lg border-b-0"
          name={"startDate"}
          maxLength={8}
          minLength={8}
          required={true}
          errorMessage={state?.fieldErrors?.startDate}
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
          readOnly
        />
        <div className="col-span-2">
          <Input
            isLong={true}
            type={"number"}
            label={"수수료"}
            placeholder={"10"}
            className="h-16 xl:text-lg border-b-1"
            name={"commission"}
            maxLength={2}
            errorMessage={state?.fieldErrors?.commission}
          />
        </div>
        <Input
          isLong={true}
          type={"text"}
          label={"은행"}
          placeholder={"국민"}
          className="h-16 xl:text-lg border-t-0 xl:border-r-0"
          name={"bank"}
          maxLength={8}
        />
        <Input
          type={"text"}
          label={"계좌번호"}
          placeholder={"12312312123123"}
          isLong={true}
          className="h-16 xl:text-lg  border-t-0"
          name={"accountNumber"}
          maxLength={15}
          errorMessage={state?.fieldErrors?.accountNumber}
        />
        <div className="col-span-2">
          <Input
            type={"text"}
            label={"비고"}
            placeholder={""}
            isLong={true}
            className="h-16 xl:text-lg rounded-b-lg border-t-0"
            name={"content"}
            errorMessage={state?.fieldErrors?.content}
          />
        </div>
        <div className="col-span-2 flex justify-end space-x-3 mt-4">
          <Button
            onClick={() => router.push("/worker")}
            text={"취소"}
            type="button"
            className="!w-1/6 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
          />

          <Button
            text={"등록"}
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
