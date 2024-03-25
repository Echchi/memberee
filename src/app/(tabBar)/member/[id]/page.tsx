"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Modal from "@/component/modal";

const Page = () => {
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
            회원 카드
          </div>
          <Input
            type={isEdit ? "text" : "div"}
            label={"이름"}
            value={"회원"}
            placeholder={"회원"}
            className="h-14 lg:text-lg border-r-0 border-b-0"
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"연락처"}
            value={"010-0000-0000"}
            placeholder={"01000000000"}
            className="h-14 lg:text-lg border-b-0"
          />
          <Input
            isLong={true}
            type={isEdit ? "text" : "div"}
            label={"생년월일"}
            value={"20240229"}
            placeholder={"20240229"}
            className="h-14 lg:text-lg border-b-0 border-r-0"
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"담당"}
            value={"이코치"}
            placeholder={"이코치"}
            className="h-14 lg:text-lg border-b-0"
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"등록일자"}
            value={today}
            placeholder={today}
            className="h-14 lg:text-lg border-b-0 border-r-0"
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"시작일자"}
            value={today}
            placeholder={today}
            className="h-14 lg:text-lg border-b-0"
          />

          <Input
            type={isEdit ? "text" : "div"}
            label={"수업 시간"}
            value={"월 목 09:00 ~ 09:20"}
            placeholder={"월 09:00 ~ 09:20 <br/> 목 09:00 ~ 09:20"}
            className="h-14 lg:text-lg border-b-0 border-r-0"
          />
          <Input
            type={isEdit ? "text" : "div"}
            label={"수업료"}
            value={formatCurrency(220000)}
            placeholder={formatCurrency(220000)}
            className="h-14 lg:text-lg border-b-0"
          />
          <div className="relative text-stone-600 font-bold text-sm lg:text-lg flex justify-center items-center h-14 bg-neutral-100 col-span-2 border-x border-t border-neutral-300">
            <span>상담 일지</span>
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
          <div className="col-span-2 border border-neutral-300 rounded-b-lg h-[40vh] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="sticky top-0 bg-stone-100 font-semibold text-lg text-center *:py-3">
                  <td className="w-1/6">작성일</td>
                  <td className="flex justify-center items-center">내용</td>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, index) => ({
                  regDate: today,
                  content: "상담일지 내용 테스트 상담일지 내용 테스트",
                })).map((item, index) => (
                  <tr
                    key={index}
                    className="*:py-3 text-center border-b border-stone-100"
                  >
                    <td>{item.regDate}</td>
                    <td className="p-3">{item.content}</td>
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
