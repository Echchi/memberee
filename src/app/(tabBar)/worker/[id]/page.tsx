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

export interface IWorkerWithMemos extends Worker {
  WorkerMemos?: WorkerMemo[];
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
  const startDateFormatted = worker?.startDate
    ? format(worker.startDate, "yyyy년 MM월 dd일")
    : "날짜 없음";

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  return (
    <>
      {isMemoModalOpen && (
        <Modal
          title="비고"
          content={
            <>
              <textarea className="w-full h-52 bg-neutral-100 p-4 rounded-xl resize-none overflow-y-auto outline-none focus:ring-2 focus:ring-emerald-600" />
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
                onClick={() => router.push("/worker")}
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
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"연락처"}
            value={worker?.phone ? formatPhone(worker?.phone) : "번호 없음"}
            placeholder={
              worker?.phone ? formatPhone(worker?.phone) : "번호 없음"
            }
            className="h-14 lg:text-lg border-b-0"
            name="phone"
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"생년월일"}
            value={birthDateFormatted}
            placeholder={
              worker?.birth ? format(worker?.birth, "yyyyMMdd") : "날짜 없음"
            }
            className="h-14 lg:text-lg border-b-0 border-r-0"
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"시작일자"}
            value={startDateFormatted}
            placeholder={
              worker?.startDate
                ? format(worker?.startDate, "yyyyMMdd")
                : "날짜 없음"
            }
            className="h-14 lg:text-lg border-b-0"
          />

          <div className="col-span-2">
            <Input
              type={isEdit ? "text" : "div"}
              label={"수수료"}
              value={`${worker?.commission} %`}
              placeholder={`${worker?.commission} %`}
              className="h-14 lg:text-lg border-b-1"
            />
          </div>

          {/*<div className="col-span-2">*/}
          {/*  <Input*/}
          {/*    type={isEdit ? "text" : "div"}*/}
          {/*    label={"계좌번호"}*/}
          {/*    value={`${worker?.bank} ${worker?.accountNumber}`}*/}
          {/*    placeholder={`${worker?.bank} ${worker?.accountNumber}`}*/}
          {/*    isLong={true}*/}
          {/*    className="h-14 lg:text-lg border-t-0"*/}
          {/*  />*/}
          {/*</div>*/}
          <Input
            type={isEdit ? "text" : "div"}
            label={"은행"}
            placeholder={worker?.bank || ""}
            className="h-14 lg:text-lg border-t-0 border-r-0"
            value={worker?.bank || ""}
            name={"bank"}
            maxLength={8}
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"계좌번호"}
            placeholder={worker?.accountNumber || ""}
            isLong={true}
            className="h-14 lg:text-lg  border-t-0"
            name={"accountNumber"}
            value={worker?.accountNumber || ""}
            maxLength={15}
          />
          {/*<div className="col-span-2">*/}
          {/*  <Input*/}
          {/*    type={isEdit ? "text" : "div"}*/}
          {/*    label={"비고"}*/}
          {/*    value={"비고"}*/}
          {/*    placeholder={""}*/}
          {/*    isLong={true}*/}
          {/*    className="h-14 lg:text-lg border-t-0 border-b-0"*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="relative text-stone-600 font-bold text-sm lg:text-lg flex justify-center items-center h-14 bg-neutral-100 col-span-2 border-x  border-neutral-300">
            <span>비고</span>
            <button
              className="absolute right-5 text-emerald-600 hover:text-emerald-500"
              onClick={() => setIsMemoModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="col-span-2 border border-neutral-300 border-b-0 max-h-[40vh] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="sticky top-0 bg-stone-100 font-semibold text-lg text-center *:py-3">
                  <td className="w-1/6">작성일</td>
                  <td className="flex justify-center items-center">내용</td>
                </tr>
              </thead>
              <tbody>
                {worker?.WorkerMemos?.map((memo, index) => (
                  <tr
                    key={index}
                    className="*:py-3 text-center border-b border-stone-100"
                  >
                    <td>{format(memo.createdAt + "", "yyyy년 MM월 dd일")}</td>
                    <td className="p-3">{memo.content}</td>
                  </tr>
                ))}
                {/*{Array.from({ length: 10 }, (_, index) => ({*/}
                {/*  regDate: today,*/}
                {/*  content: "상담일지 내용 테스트 상담일지 내용 테스트",*/}
                {/*})).map((item, index) => (*/}
                {/*  <tr*/}
                {/*    key={index}*/}
                {/*    className="*:py-3 text-center border-b border-stone-100"*/}
                {/*  >*/}
                {/*    <td>{item.regDate}</td>*/}
                {/*    <td className="p-3">{item.content}</td>*/}
                {/*  </tr>*/}
                {/*))}*/}
              </tbody>
            </table>
          </div>
          <div className="text-stone-600 font-bold text-sm lg:text-lg flex justify-center items-center h-14 bg-neutral-100 col-span-2 border-x border-t border-neutral-300">
            담당 회원
          </div>
          <div className="col-span-2 border border-neutral-300 rounded-b-lg h-[40vh] overflow-y-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="sticky top-0 bg-stone-100 font-semibold text-lg text-center *:py-3">
                  <td>이름</td>
                  <td>연락처</td>

                  <td>
                    <select className="bg-transparent outline-none focus:outline-none">
                      <option>요일</option>
                      <option>월</option>
                      <option>화</option>
                      <option>수</option>
                      <option>목</option>
                      <option>금</option>
                      <option>토</option>
                      <option>일</option>
                    </select>
                  </td>
                  <td className="flex justify-center items-center">등록일</td>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, index) => ({
                  name: `이름 ${index + 1}`,
                  phone: "010-0000-0000",
                  worker: "함코치",
                  regDate: "2024.01.01.",
                  dayOfWeek: "월 수",
                  pay: Math.floor(Math.random() * 3) - 1,
                })).map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => router.push(`/member/${index}`)}
                    className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
                  >
                    <td>{item.name}</td>
                    <td>{item.phone}</td>

                    <td>{item.dayOfWeek}</td>
                    <td>{item.regDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            text={isEdit ? "취소" : "탈퇴"}
            className="!bg-neutral-300 hover:!bg-neutral-200 active:!bg-neutral-400 !w-1/6"
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
