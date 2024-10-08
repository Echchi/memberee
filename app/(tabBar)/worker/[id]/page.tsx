"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../../../component/input";
import {
  cls,
  dateFormattedtoKor,
  dateFormattedtoNum,
  formatKorDate,
  formatPhone,
} from "../../../../libs/client/utils";
import Button from "../../../../component/button/button";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import db from "../../../../libs/server/db";
import {
  createWorkerMemo,
  deleteWorkerMemo,
  getWorker,
  getWorkerMemos,
  terminateWorker,
  updateWorkerMemo,
} from "./api";
import { Worker, WorkerMemo, Member } from ".prisma/client";
import Modal from "../../../../component/modal/modal";
import { DAYOFWEEK } from "../../../../libs/constants";
import Members from "../../../../component/page/worker/detail/members";
import Memos from "../../../../component/page/worker/detail/memos";
import { motion } from "framer-motion";
import SelectWorkingDay from "../../../../component/page/worker/workingDay";
import { useFormState } from "react-dom";
import { createAccount } from "../../../join/action";
import { updateWorker } from "./action";
import ConfirmModal from "../../../../component/modal/confirmModal";
import { Memo, Schedule } from "@prisma/client";
import { getMemos } from "../../member/[id]/api";
import { PrintPdfBtn } from "../../../../component/pdf/printPdfBtn";
import WarningContent from "./warningContent";

export interface MemberWithSch extends Member {
  Schedule: Schedule[];
}

export interface IWorkerWithMemos extends Worker {
  WorkerMemos?: WorkerMemo[];
  Member?: MemberWithSch[];
}

const Page = ({ params }: { params: { id: string } }) => {
  const [worker, setWorker] = useState<IWorkerWithMemos>();
  const id = params.id;
  const [memos, setMemos] = useState<WorkerMemo[]>([]);
  const [slice, setSlice] = useState(1);
  const [loading, setLoading] = useState(true);
  const [memSlice, setMemSlice] = useState(1);
  const [memLoading, setMemLoading] = useState(false);
  const workerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        if (id) {
          const response = await getWorker(+id, memSlice);

          response && setWorker(response);
          setLoading(false);
        }
      } catch (error) {
        return router.replace("/404");
      }
    };

    fetchWorker();
  }, [id]);

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        if (id) {
          const response = await getWorkerMemos(+id, slice);

          if (response) {
            setMemos(response);
          }
        }
      } catch (error) {
        return new Error("error fetch memos");
      }
    };
    fetchMemo();
  }, [id, slice]);

  const router = useRouter();
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const [isEdit, setIsEdit] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number[]>([]);

  useEffect(() => {
    if (worker?.dayOfWeek) {
      const dayIndexes = worker.dayOfWeek.split("").map((day) => +day);
      setSelectedDay(dayIndexes);
    }
  }, [worker?.dayOfWeek]);

  const updateWorkerWithId = updateWorker.bind(null, id);
  const [state, action] = useFormState(updateWorkerWithId, null);

  const handleSelectDay = (event: React.MouseEvent, dayIndex: number) => {
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
  const [isWarningOpen, setIsWarningOpen] = useState(false);
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
              onConfirm={() => terminateWorker(+id)}
            />
          }
        />
      )}
      {isWarningOpen && (
        <Modal
          title={""}
          onClose={() => setIsWarningOpen(false)}
          content={
            <Modal
              title={""}
              content={
                <WarningContent
                  memberCnt={worker?.Member?.length || 0}
                  onClose={() => setIsWarningOpen(false)}
                />
              }
              onClose={() => setIsWarningOpen(false)}
            />
          }
        />
      )}
      <form
        className="mt-3 xl:mt-0 xl:box justify-center flex-col"
        action={action}
      >
        <div className="col-span-2 flex justify-end items-center">
          <div className="hidden xl:flex items-center justify-end space-x-4 w-full *:w-32">
            <div>
              <Button
                onClick={() => router.push("/worker")}
                text={"목록"}
                type="button"
                className="my-2 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
              />
            </div>
            <div>
              <PrintPdfBtn
                title={`직원 ${worker?.name} 상세_${format(new Date(), "yyyyMMdd")}`}
                content={workerRef}
              />
            </div>
          </div>
        </div>
        <div ref={workerRef} className="xl:grid grid-cols-2">
          <div className="col-span-2 border border-x border-b-0 flex bg-stone-100 text-stone-600 tracking-wider text-lg xl:text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg print:flex">
            직원 카드
          </div>

          <Input
            type={isEdit ? "text" : "div"}
            label={"이름"}
            value={worker?.name}
            placeholder={worker?.name}
            className="h-16 xl:text-lg xl:border-r-0 border-b-0"
            name="name"
            maxLength={6}
            minLength={2}
            errorMessage={state?.fieldErrors.name}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "tel"}
            label={"연락처"}
            value={
              !isEdit
                ? worker?.phone
                  ? formatPhone(worker?.phone)
                  : ""
                : worker?.phone
            }
            placeholder={worker?.phone ? formatPhone(worker?.phone) : ""}
            className="h-16 xl:text-lg border-b-0"
            name="phone"
            maxLength={11}
            minLength={10}
            errorMessage={state?.fieldErrors.phone}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"생년월일"}
            value={
              isEdit
                ? dateFormattedtoNum(worker?.birth)
                : dateFormattedtoKor(worker?.birth)
            }
            placeholder={dateFormattedtoNum(worker?.birth)}
            className="h-16 xl:text-lg border-b-0 xl:border-r-0"
            name="birth"
            maxLength={8}
            minLength={8}
            errorMessage={state?.fieldErrors.birth}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"시작일자"}
            value={
              isEdit
                ? dateFormattedtoNum(worker?.startDate)
                : dateFormattedtoKor(worker?.startDate)
            }
            placeholder={dateFormattedtoNum(worker?.startDate)}
            className="h-16 xl:text-lg border-b-0"
            name="startDate"
            maxLength={8}
            minLength={8}
            errorMessage={state?.fieldErrors.startDate}
          />
          <div className="col-span-2">
            {!isEdit ? (
              <Input
                type={"div"}
                label={"근무요일"}
                value={worker?.dayOfWeek
                  ?.split("")
                  .map((day, index) => +day)
                  .sort()
                  .map((day) => `${DAYOFWEEK[+day]} ` || "")}
                className="h-16 xl:text-lg border-b-0"
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
            readOnly
          />
          <div className="col-span-2">
            <Input
              type={isEdit ? "text" : "div"}
              label={"수수료"}
              value={
                isEdit
                  ? worker?.commission + ""
                  : worker?.commission
                    ? `${worker?.commission} %`
                    : ""
              }
              placeholder={`${worker?.commission} %` || ""}
              className="h-16 xl:text-lg border-b-1"
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
              "h-16 xl:text-lg border-t-0 xl:border-r-0",
              isEdit ? "xl:rounded-bl-lg" : "",
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
              "h-16 xl:text-lg border-t-0",
              isEdit ? "rounded-b-lg xl:rounded-br-lg xl:rounded-bl-none" : "",
            )}
            name={"accountNumber"}
            value={worker?.accountNumber || ""}
            maxLength={15}
          />

          {isEdit ? (
            <></>
          ) : (
            <motion.div className="col-span-2">
              <Memos
                memos={memos}
                loading={loading}
                setSlice={setSlice}
                id={worker?.id + "" || ""}
                title={"비고"}
                createMemo={createWorkerMemo}
                updateMemo={updateWorkerMemo}
                deleteMemo={deleteWorkerMemo}
              />
              <Members
                members={worker?.Member || []}
                setMemSlice={setMemSlice}
                loading={loading}
              />
            </motion.div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            text={isEdit ? "취소" : "퇴사"}
            className={cls("py-3 !w-1/6", isEdit ? "gray_btn" : "red_btn")}
            type={"button"}
            onClick={
              isEdit
                ? (event: MouseEvent) => handleCancelBtn(event)
                : () =>
                    worker?.Member && worker?.Member?.length > 0
                      ? setIsWarningOpen(true)
                      : setIsConfirmOpen(true)
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
