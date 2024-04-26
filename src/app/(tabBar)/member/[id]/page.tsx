"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import {
  cls,
  dateFormattedtoKor,
  dateFormattedtoNum,
  formatCurrency,
  formatPhone,
} from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format, getTime } from "date-fns";
import { useRouter } from "next/navigation";
import Modal from "@/component/modal";

import { getMember } from "@/app/(tabBar)/member/[id]/api";
import { DAYOFWEEK } from "@/libs/constants";
import { Memo, Member, Worker, Schedule } from "@prisma/client";
import WorkerList from "@/component/member/register/workerList";
import { motion } from "framer-motion";
import Memos from "@/component/worker/detail/memos";
import Members from "@/component/worker/detail/members";

export interface IMemberWithSchedules extends Member {
  Memos?: Memo[];
  Schedule?: Schedule[];
  worker?: Worker;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [member, setMember] = useState<IMemberWithSchedules>();
  const id = params.id;
  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (id) {
          const response = await getMember(+id);
          console.log("getMember", response);
          response && setMember(response);
        }
      } catch (error) {
        return new Error("error fetch member");
      }
    };
    fetchMember();
  }, [id]);

  const router = useRouter();
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const [isEdit, setIsEdit] = useState(false);

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  return (
    <>
      {isMemoModalOpen && (
        <Modal
          title="상담일지"
          content={
            <>
              <textarea
                cols={70}
                className="h-52 bg-neutral-100 p-4 rounded-xl resize-none overflow-y-auto outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <Button text="등록" className="mt-3" />
            </>
          }
          onClose={() => setIsMemoModalOpen(false)}
        />
      )}
      <div className="box justify-center flex-col">
        <div className="col-span-2 flex justify-end items-center">
          <div className="hidden md:flex items-center justify-end space-x-4 w-full *:w-32">
            <div>
              <Button
                onClick={() => router.push("/member")}
                text={"목록"}
                className="my-2 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
              />
            </div>
            <div>
              <Button text="출력" className="my-2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-2 border border-x border-b-0 hidden md:flex bg-stone-100 text-stone-600 tracking-wider text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
            회원 카드
          </div>
          <Input
            type={isEdit ? "text" : "div"}
            label={"이름"}
            value={member?.name}
            placeholder={member?.name}
            className="h-14 lg:text-lg border-r-0 border-b-0"
            name={"name"}
            maxLength={6}
            minLength={2}
            required={true}
            // errorMessage={state?.fieldErrors.name}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"연락처"}
            value={
              !isEdit
                ? member?.phone
                  ? formatPhone(member?.phone)
                  : "번호 없음"
                : member?.phone
            }
            placeholder={
              member?.phone ? formatPhone(member?.phone) : "번호 없음"
            }
            className="h-14 lg:text-lg border-b-0"
            name={"phone"}
            maxLength={11}
            minLength={10}
            required={true}
            // errorMessage={state?.fieldErrors.phone}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"생년월일"}
            value={
              isEdit
                ? dateFormattedtoNum(member?.birth)
                : dateFormattedtoKor(member?.birth)
            }
            placeholder={dateFormattedtoNum(member?.birth)}
            className="h-14 lg:text-lg border-b-1 border-r-0"
            name={"birth"}
            // errorMessage={state?.fieldErrors.birth}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"직업"}
            value={member?.job || "미등록"}
            placeholder={member?.job || "미등록"}
            className="h-14 lg:text-lg border-b-1"
            name={"job"}
          />

          {isEdit ? (
            <>
              {/*  <div*/}
              {/*    className={cls(*/}
              {/*      "bg-white py-3 col-span-2 border border-t-0 border-b-1 border-neutral-300 flex flex-col lg:pl-10 pl-4",*/}
              {/*      state?.fieldErrors.dayOfWeek*/}
              {/*        ? "!border-2 border-orange-500 animate-pulse"*/}
              {/*        : "",*/}
              {/*    )}*/}
              {/*  >*/}
              {/*    <div className="flex h-14">*/}
              {/*      <span className="hidden lg:flex items-center lg:text-lg flex-nowrap w-24 font-semibold text-stone-600">*/}
              {/*        요일 선택*/}
              {/*      </span>*/}

              {/*      <div className="relative grid grid-cols-7 justify-items-center lg:py-3 w-full px-4 overflow-y-auto">*/}
              {/*        {Object.entries(DAYOFWEEK).map(([index, day]) => (*/}
              {/*          <div*/}
              {/*            key={day}*/}
              {/*            className="relative flex flex-col justify-center items-center text-lg *:lg:py-2 *:lg:px-4 *:transition-all *:py-1 *:px-2.5"*/}
              {/*          >*/}
              {/*            <button*/}
              {/*              type={"button"}*/}
              {/*              className={cls(*/}
              {/*                "rounded-full text-stone-600",*/}
              {/*                selectedDay.includes(+index)*/}
              {/*                  ? "ring-2 ring-inset ring-emerald-600 font-bold"*/}
              {/*                  : "bg-transparent font-medium",*/}
              {/*              )}*/}
              {/*              onClick={(event: React.MouseEvent) =>*/}
              {/*                handleSelectDay(event, +index)*/}
              {/*              }*/}
              {/*            >*/}
              {/*              {day}*/}
              {/*            </button>*/}
              {/*          </div>*/}
              {/*        ))}*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <input*/}
              {/*    type={"text"}*/}
              {/*    value={selectedDay.join("")}*/}
              {/*    className="hidden"*/}
              {/*    name={"dayOfWeek"}*/}
              {/*  />*/}
              {/*  {selectedDay.length > 0 && (*/}
              {/*    <SelectTime*/}
              {/*      selectedDay={selectedDay}*/}
              {/*      handleTimeChange={handleTimeChange}*/}
              {/*      formError={state?.fieldErrors.times}*/}
              {/*      timeError={timeError}*/}
              {/*      setTimeError={setTimeError}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*  <input*/}
              {/*    type={"text"}*/}
              {/*    value={JSON.stringify(selectedTime)}*/}
              {/*    className="hidden"*/}
              {/*    required={true}*/}
              {/*    name={"times"}*/}
              {/*  />*/}
            </>
          ) : (
            <div className="bg-white py-3 col-span-2 border border-y-0 border-neutral-300 flex flex-col">
              <div className="flex">
                {/*<div className="hidden lg:flex items-center lg:text-lg flex-nowrap w-24 font-semibold text-stone-600 ">*/}
                {/*  수업 시간*/}
                {/*</div>*/}
                <div className="flex justify-center *: text-center w-full space-y-3 *:lg:text-lg *:font-medium *:text-stone-600 overflow-y-auto h-36">
                  <div className="w-2/3 grid grid-cols-3 place-items-center gap-x-3">
                    <div className="!font-semibold">요일</div>
                    <div className="!font-semibold">시작 시간</div>
                    <div className="!font-semiboldl">종료 시간</div>
                    {member?.Schedule?.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="self-center">
                          {DAYOFWEEK[item.dayOfWeek]}요일
                        </div>

                        <div className="rounded-lg bg-stone-100 outline-none text-xs xl:text-lg font-medium text-center w-full py-2 px-3">
                          {format(item.startTime, "HH:mm")}
                        </div>

                        <div className="rounded-lg bg-stone-100 outline-none text-xs xl:text-lg font-medium text-center w-full py-2 px-3">
                          {format(item.endTime, "HH:mm")}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Input
            type={isEdit ? "text" : "div"}
            label={"수업료"}
            value={
              isEdit
                ? member?.Schedule?.[0]?.lessonFee + ""
                : formatCurrency(member?.Schedule?.[0]?.lessonFee || "미등록")
            }
            placeholder={member?.Schedule?.[0]?.lessonFee + ""}
            className="h-14 lg:text-lg border-b-0 border-r-0"
            name={"lessonFee"}
            maxLength={7}
            minLength={4}
            required={true}
            // errorMessage={state?.fieldErrors.lessonFee}
          />
          {isEdit ? (
            <WorkerList selectedDay={[]} />
          ) : (
            <Input
              type={"div"}
              label={"담당"}
              value={member?.worker?.name}
              placeholder={member?.worker?.name}
              className="h-14 lg:text-lg border-b-0"
            />
          )}

          <Input
            type={isEdit ? "text" : "div"}
            label={"시작일자"}
            value={dateFormattedtoKor(member?.startDate)}
            placeholder={dateFormattedtoNum(member?.startDate)}
            className="h-14 lg:text-lg border-b-1 border-r-0"
            name={"startDate"}
            maxLength={8}
            minLength={8}
            required={true}
            // errorMessage={state?.fieldErrors.startDate}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"등록일자"}
            value={dateFormattedtoKor(member?.createdAt)}
            placeholder={dateFormattedtoNum(member?.createdAt)}
            className="h-14 lg:text-lg border-b-1"
          />

          {isEdit ? (
            <></>
          ) : (
            <motion.div className="col-span-2">
              <Memos
                memos={member?.Memos?.sort((a, b) => b.id - a.id) || []}
                id={member?.id + "" || ""}
                title={"상담 내역"}
                isMember={true}
              />
            </motion.div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            text={isEdit ? "취소" : "탈퇴"}
            className={cls("!w-1/6", isEdit ? "gray_btn" : "red_btn")}
            type={"button"}
            onClick={isEdit ? () => setIsEdit(false) : undefined}
          />
          <Button
            text={isEdit ? "완료" : "수정"}
            className="!w-1/6"
            type={isEdit ? "submit" : "button"}
            onClick={isEdit ? () => setIsEdit(false) : () => setIsEdit(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
