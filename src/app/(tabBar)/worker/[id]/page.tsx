"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { cls, formatKorDate, formatPhone } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import db from "@/libs/server/db";
import { getWorker } from "@/app/(tabBar)/worker/[id]/api";
import { Worker, WorkerMemo } from ".prisma/client";
import Modal from "@/component/modal";
import { DAYOFWEEK } from "@/libs/constants";
import Members from "@/component/worker/detail/members";
import Memos from "@/component/worker/detail/memos";
import { motion } from "framer-motion";
import SelectWorkingDay from "@/component/worker/workingDay";
import { useFormState } from "react-dom";
import { createAccount } from "@/app/join/action";
import { updateWorker } from "@/app/(tabBar)/worker/[id]/action";
import ConfirmModal from "@/component/modal/confirmModal";

export interface IWorkerWithMemos extends Worker {
  WorkerMemos?: WorkerMemo[];
}

function ConfirmModalå() {
  return null;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [worker, setWorker] = useState<IWorkerWithMemos>();
  const id = params.id;

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        if (id) {
          const response = await getWorker(+id);
          console.log(response);
          response && setWorker(response);
        }
      } catch (error) {
        return new Error("error fetch worker");
      }
    };

    fetchWorker();
  }, [id]);
  const router = useRouter();
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const [isEdit, setIsEdit] = useState(false);
  const birthDateFormatted = worker?.birth
    ? format(worker.birth, "yyyy년 MM월 dd일")
    : "날짜 없음";
  const birthDateNotFormatted = worker?.birth
    ? format(worker?.birth, "yyyyMMdd")
    : "날짜 없음";
  const startDateFormatted = worker?.startDate
    ? format(worker.startDate, "yyyy년 MM월 dd일")
    : "날짜 없음";
  const startDateNotFormatted = worker?.startDate
    ? format(worker?.startDate, "yyyyMMdd")
    : "날짜 없음";

  const [selectedDay, setSelectedDay] = useState<number[]>([]);

  useEffect(() => {
    if (worker?.dayOfWeek) {
      const dayIndexes = worker.dayOfWeek.split("").map((day) => +day);
      setSelectedDay(dayIndexes);
    }
  }, [worker?.dayOfWeek]);

  const updateWorkerWithId = updateWorker.bind(null, id);
  const [state, action] = useFormState(updateWorkerWithId, null);

  const handleSelectDay = (dayIndex: number) => {
    if (selectedDay.includes(dayIndex)) {
      setSelectedDay((prev) =>
        prev.filter((selected) => selected !== dayIndex),
      );
    } else {
      setSelectedDay((prev) => [...prev, dayIndex]);
    }
  };

  const handleUpdateBtn = (event: MouseEvent) => {
    event.preventDefault();
    setIsEdit(true);
  };
  const handleCancelBtn = (event: MouseEvent) => {
    event.preventDefault();
    setIsEdit(false);
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      {isConfirmOpen && (
        <Modal
          title={""}
          onClose={() => setIsConfirmOpen(false)}
          content={
            <ConfirmModal
              name={worker?.name || ""}
              action={"퇴사 처리"}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => setIsConfirmOpen(false)}
            />
          }
        />
      )}
      <form className="box justify-center flex-col" action={action}>
        <div className="col-span-2 flex justify-end items-center">
          <div className="hidden md:flex items-center justify-end space-x-4 w-full *:w-32">
            <div>
              <Button
                onClick={() => router.push("/worker")}
                text={"목록"}
                type="button"
                className="my-2 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
              />
            </div>
            <div>
              <Button text="출력" type="button" className="my-2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-2 border border-x border-b-0 hidden md:flex bg-stone-100 text-stone-600 pl-10 tracking-wider text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
            직원 카드
          </div>

          <Input
            type={isEdit ? "text" : "div"}
            label={"이름"}
            value={worker?.name}
            placeholder={worker?.name}
            className="h-14 lg:text-lg border-r-0 border-b-0"
            name="name"
            maxLength={6}
            minLength={2}
            errorMessage={state?.fieldErrors.name}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"연락처"}
            value={
              !isEdit
                ? worker?.phone
                  ? formatPhone(worker?.phone)
                  : "번호 없음"
                : worker?.phone
            }
            placeholder={
              worker?.phone ? formatPhone(worker?.phone) : "번호 없음"
            }
            className="h-14 lg:text-lg border-b-0"
            name="phone"
            maxLength={11}
            minLength={10}
            errorMessage={state?.fieldErrors.phone}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"생년월일"}
            value={isEdit ? birthDateNotFormatted : birthDateFormatted}
            placeholder={birthDateNotFormatted}
            className="h-14 lg:text-lg border-b-0 border-r-0"
            name="birth"
            maxLength={8}
            minLength={8}
            errorMessage={state?.fieldErrors.birth}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"시작일자"}
            value={isEdit ? startDateNotFormatted : startDateFormatted}
            placeholder={startDateNotFormatted}
            className="h-14 lg:text-lg border-b-0"
            name="startDate"
            maxLength={8}
            minLength={8}
            errorMessage={state?.fieldErrors.startDate}
          />
          <div className="col-span-2">
            {!isEdit ? (
              <Input
                type={"div"}
                label={"근무일"}
                value={worker?.dayOfWeek
                  ?.split("")
                  .map((day, index) => +day)
                  .sort()
                  .map((day) => `${DAYOFWEEK[+day]} ` || "")}
                className="h-14 lg:text-lg border-b-0"
              />
            ) : (
              <SelectWorkingDay
                selectedDay={selectedDay}
                handleSelectDay={handleSelectDay}
              />
            )}
          </div>
          <input
            type={"text"}
            value={selectedDay.join("")}
            className="hidden"
            name={"dayOfWeek"}
          />
          <div className="col-span-2">
            <Input
              type={isEdit ? "text" : "div"}
              label={"수수료"}
              value={
                isEdit ? worker?.commission + "" : `${worker?.commission} %`
              }
              placeholder={`${worker?.commission} %` || ""}
              className="h-14 lg:text-lg border-b-1"
              name="commission"
              maxLength={2}
              errorMessage={state?.fieldErrors.commission}
            />
          </div>

          <Input
            type={isEdit ? "text" : "div"}
            label={"은행"}
            placeholder={worker?.bank || ""}
            className={cls(
              "h-14 lg:text-lg border-t-0 border-r-0",
              isEdit ? "rounded-bl-lg" : "",
            )}
            value={worker?.bank || ""}
            name={"bank"}
            maxLength={8}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"계좌번호"}
            placeholder={worker?.accountNumber || ""}
            isLong={true}
            className={cls(
              "h-14 lg:text-lg border-t-0",
              isEdit ? "rounded-br-lg" : "",
            )}
            name={"accountNumber"}
            value={worker?.accountNumber || ""}
            maxLength={15}
          />

          {isEdit ? (
            <></>
          ) : (
            <motion.div className="col-span-2">
              <Memos memos={worker?.WorkerMemos || []} />
              <Members id={id} />
            </motion.div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            text={isEdit ? "취소" : "퇴사"}
            className="!bg-neutral-300 hover:!bg-neutral-200 active:!bg-neutral-400 !w-1/6"
            type={"button"}
            onClick={
              isEdit
                ? (event: MouseEvent) => handleCancelBtn(event)
                : () => setIsConfirmOpen(true)
            }
          />

          {!isEdit ? (
            <Button
              text={"수정"}
              className="!w-1/6"
              type="button"
              onClick={(event: MouseEvent) => handleUpdateBtn(event)}
            />
          ) : (
            <Button text={"완료"} className="!w-1/6" type="submit" />
          )}
        </div>
      </form>
    </>
  );
};

export default Page;
