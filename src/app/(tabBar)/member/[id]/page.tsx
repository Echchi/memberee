"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/component/input";
import {
  cls,
  compareDate,
  dateFormattedtoKor,
  dateFormattedtoNum,
  formatCurrency,
  formatKorDate,
  formatPhone,
  generatePaymentDates,
} from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format, getTime } from "date-fns";
import { useRouter } from "next/navigation";
import Modal from "@/component/modal";

import {
  changeStatusMember,
  createMemberMemo,
  deleteMemberMemo,
  getMember,
  getMemos,
  updateMemberMemo,
  updateStopPeriodPayment,
} from "@/app/(tabBar)/member/[id]/api";
import { DAYOFWEEK, TIME_REGEX, TIME_REGEX_ERROR } from "@/libs/constants";
import {
  Memo,
  Member,
  Worker,
  Schedule,
  Payment,
  Company,
  WorkerChangeLog,
} from "@prisma/client";
import WorkerList from "@/component/page/member/register/workerList";
import { motion } from "framer-motion";
import Memos from "@/component/page/worker/detail/memos";
import Members from "@/component/page/worker/detail/members";
import SelectTime, { ITime } from "@/component/page/member/register/selectTime";
import ConfirmModal from "@/component/modal/confirmModal";
import { updateWorker } from "@/app/(tabBar)/worker/[id]/action";
import { useFormState } from "react-dom";
import { updateMember } from "@/app/(tabBar)/member/[id]/action";
import { revalidatePath } from "next/cache";
import { PrintPdfBtn } from "@/component/pdf/printPdfBtn";

export interface IMemberWithSchedules extends Member {
  Memos?: Memo[];
  Schedule?: Schedule[];
  worker?: Worker | null;
  Payment?: Payment[];
  company?: Company | null;
  WorkerChangeLog?: WorkerChangeLog[] | null;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [member, setMember] = useState<IMemberWithSchedules>();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [slice, setSlice] = useState(1);
  const [loading, setLoading] = useState(true);
  const memberRef = useRef<HTMLDivElement | null>(null);

  const id = params.id;
  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (id) {
          const response = await getMember(+id);

          if (response) {
            setMember(response);
            setSelectedDay(
              response.Schedule?.map((item, index) => item.dayOfWeek),
            );
            response.Schedule?.map((item) =>
              setSelectedTime((prev) => ({
                ...prev,
                [item.dayOfWeek]: {
                  // @ts-ignore
                  startTime: format(item.startTime, "HH:mm"),
                  endTime: format(item.endTime, "HH:mm"),
                },
              })),
            );
            setLoading(false);
          }
        }
      } catch (error) {
        return router.replace("/404");
      }
    };
    fetchMember();
  }, [id]);

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        if (id) {
          const response = await getMemos(+id, slice);

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

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number[]>([]);
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
        delete updatedTimes[dayIndex];
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"중단" | "탈퇴" | "중단 취소">(
    "중단 취소",
  );
  const [includeThismonth, setIncludeThisMonth] = useState(false);
  const handleStopClick = () => {
    setIncludeThisMonth(compareDate(member?.company?.payDay || 1));
    setConfirmType("중단");
    setIsConfirmOpen(true);
  };

  const handleRestartClick = async () => {
    await changeStatusMember(+id, 1);
    if (member?.suspendedDate && member?.company?.payDay) {
      const suspendedPeriod = generatePaymentDates(
        member?.suspendedDate,
        member?.company?.payDay,
        false,
      );
      for (const period of suspendedPeriod) {
        const year = period.slice(0, 4);
        const month = period.slice(4);

        await updateStopPeriodPayment(+id, member.workerId, year, month);
      }
    }
    router.refresh();
  };

  const handleTerminateClick = () => {
    setIncludeThisMonth(compareDate(member?.company?.payDay || 1));
    setConfirmType("탈퇴");
    setIsConfirmOpen(true);
  };
  const updateMemberWithId = updateMember.bind(null, id);
  const [state, action] = useFormState(updateMemberWithId, null);

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
      {isConfirmOpen && (
        <Modal
          title={""}
          onClose={() => setIsConfirmOpen(false)}
          content={
            <ConfirmModal
              name={member?.name || ""}
              action={`${confirmType} 처리`}
              onClose={() => setIsConfirmOpen(false)}
              includeThismonth={includeThismonth}
              onConfirm={() =>
                changeStatusMember(+id, confirmType === "탈퇴" ? 0 : -1)
              }
            />
          }
        />
      )}
      <form
        className="mt-3 xl:mt-0 xl:box justify-center flex-col"
        action={action}
      >
        <div className="col-span-2 flex justify-end items-center">
          <div className="relative flex items-center justify-end w-full">
            {member && member?.status < 0 && (
              <p className="absolute left-0 rounded-full  bg-amber-400/50 py-2 px-10 text-orange-600 font-semibold text-xs xl:text-base xl:w-fit w-full z-50">
                {format(member?.suspendedDate || "", "yyyy년 MM월 dd일")} 부터
                중단 상태의 회원입니다
              </p>
            )}
            <div className="hidden xl:flex space-x-4 *:w-32">
              <Button
                onClick={() => router.push("/member")}
                text={"목록"}
                type={"button"}
                className="my-2 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
              />

              {/*<Button text="출력" type={"button"} className="my-2" />*/}
              <PrintPdfBtn
                title={`회원 ${member?.name} 상세_${format(new Date(), "yyyyMMdd")}`}
                content={memberRef}
              />
            </div>
          </div>
        </div>
        <div
          ref={memberRef}
          className={cls(
            "xl:grid grid-cols-2 ",
            member && member?.status < 0 ? "*:bg-stone-100" : "",
          )}
        >
          <div className="relative col-span-2 border border-x border-b-0 flex bg-stone-100 text-stone-600 tracking-wider text-lg xl:text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg print:flex">
            회원 카드
          </div>
          <Input
            type={isEdit ? "text" : "div"}
            label={"이름"}
            value={member?.name}
            placeholder={member?.name}
            className={"h-16 xl:text-lg xl:border-r-0 border-b-0"}
            name={"name"}
            maxLength={6}
            minLength={2}
            required={true}
            errorMessage={state?.fieldErrors.name}
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "tel"}
            label={"연락처"}
            value={
              !isEdit
                ? member?.phone
                  ? formatPhone(member?.phone)
                  : ""
                : member?.phone
            }
            placeholder={
              member?.phone ? formatPhone(member?.phone) : "번호 없음"
            }
            className="h-16 xl:text-lg border-b-0"
            name={"phone"}
            maxLength={11}
            minLength={10}
            required={true}
            errorMessage={state?.fieldErrors.phone}
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
            className="h-16 xl:text-lg border-b-1 xl:border-r-0"
            name={"birth"}
            errorMessage={state?.fieldErrors.birth}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"직업"}
            value={member?.job || ""}
            placeholder={member?.job || ""}
            className="h-16 xl:text-lg border-b-1"
            name={"job"}
          />

          {isEdit ? (
            <>
              <div
                className={cls(
                  "bg-white py-3 col-span-2 border border-t-0 border-b-1 border-neutral-300 flex flex-col xl:pl-10 pl-4",
                  state?.fieldErrors.dayOfWeek
                    ? "!border-2 border-orange-500 animate-pulse"
                    : "",
                )}
              >
                <div className="flex h-16">
                  <span className="hidden xl:flex items-center xl:text-lg flex-nowrap w-24 font-semibold text-stone-600">
                    요일 선택
                  </span>

                  <div className="relative grid grid-cols-7 justify-items-center xl:py-3 w-full px-4 overflow-y-auto">
                    {Object.entries(DAYOFWEEK).map(([index, day]) => (
                      <div
                        key={day}
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
                  // formError={state?.fieldErrors.times}
                  timeError={timeError}
                  selectedTime={selectedTime}
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
            </>
          ) : (
            <div className="bg-white py-3 col-span-2 border border-y-0 border-neutral-300 flex flex-col">
              <div className="flex">
                <div className="flex justify-center *: text-center w-full space-y-3 *:xl:text-lg *:font-medium *:text-stone-600 overflow-y-auto h-36 my-5">
                  <div className="w-2/3 grid grid-cols-3 place-items-center gap-3">
                    <div className="!font-semibold">요일</div>
                    <div className="!font-semibold">시작 시간</div>
                    <div className="!font-semiboldl">종료 시간</div>
                    {!loading && member ? (
                      member?.Schedule?.map((item, index) => (
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
                      ))
                    ) : (
                      <>
                        {[...Array(6)].map((_, index) => (
                          <div
                            key={index}
                            className="self-center skeleton w-full xl:w-2/3 rounded-lg h-9 xl:h-12"
                          />
                        ))}
                      </>
                    )}
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
                : formatCurrency(member?.Schedule?.[0]?.lessonFee || "")
            }
            placeholder={member?.Schedule?.[0]?.lessonFee + ""}
            className={cls(
              "h-16 xl:text-lg border-b-0 xl:border-r-0",
              isEdit ? "border-t-0" : "",
            )}
            name={"lessonFee"}
            maxLength={7}
            minLength={4}
            required={true}
            errorMessage={state?.fieldErrors.lessonFee}
          />
          {isEdit ? (
            <WorkerList
              selectedDay={selectedDay}
              selectedWorker={member?.worker?.id}
            />
          ) : (
            <Input
              type={"div"}
              label={"담당"}
              value={member?.worker?.name}
              placeholder={member?.worker?.name}
              className="h-16 xl:text-lg border-b-0"
            />
          )}

          <Input
            type={isEdit ? "text" : "div"}
            label={"시작일자"}
            value={
              isEdit
                ? dateFormattedtoNum(member?.startDate)
                : dateFormattedtoKor(member?.startDate)
            }
            placeholder={
              isEdit
                ? dateFormattedtoNum(member?.startDate)
                : dateFormattedtoKor(member?.startDate)
            }
            className={cls(
              "h-16 xl:text-lg border-b-1",
              isEdit ? "col-span-2 rounded-b-lg" : "xl:border-r-0",
            )}
            name={"startDate"}
            maxLength={8}
            minLength={8}
            required={true}
            errorMessage={state?.fieldErrors.startDate}
          />
          {!isEdit && (
            <Input
              type={"div"}
              label={"등록일자"}
              value={dateFormattedtoKor(member?.createdAt)}
              className="h-16 xl:text-lg border-b-1 rounded-b-xl xl:rounded-b-none"
            />
          )}

          {isEdit ? (
            <></>
          ) : (
            <motion.div className="col-span-2 hidden xl:block">
              <Memos
                memos={memos}
                id={member?.id + "" || ""}
                status={member?.status}
                title={"상담 내역"}
                isMember={true}
                createMemo={createMemberMemo}
                updateMemo={updateMemberMemo}
                deleteMemo={deleteMemberMemo}
                setSlice={setSlice}
                loading={loading}
              />
            </motion.div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex w-full space-x-3">
            <Button
              text={isEdit ? "취소" : "탈퇴"}
              className={cls("!py-3 !w-1/6", isEdit ? "gray_btn" : "red_btn")}
              type={"button"}
              onClick={
                isEdit ? () => setIsEdit(false) : () => handleTerminateClick()
              }
            />
            {!isEdit && (
              <Button
                text={member && member?.status < 0 ? "중단 취소" : "중단"}
                className={cls(
                  "py-3 !w-1/6 min-w-fit",
                  member && member?.status < 0 ? "amber_btn" : "orange_btn",
                )}
                type={"button"}
                onClick={
                  member && member?.status < 0
                    ? () => handleRestartClick()
                    : () => handleStopClick()
                }
              />
            )}
          </div>
          {member &&
            member.status > 0 &&
            (!isEdit ? (
              <Button
                text={"수정"}
                className="!w-1/6"
                type="button"
                onClick={() => setIsEdit(true)}
              />
            ) : (
              <Button
                text={"완료"}
                isButtonDisabled={!!timeError}
                className="!w-1/6"
                type={"submit"}
              />
            ))}
        </div>
      </form>
    </>
  );
};

export default Page;
