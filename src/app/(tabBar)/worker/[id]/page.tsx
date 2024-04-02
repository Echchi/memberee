"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import { cls } from "@/libs/client/utils";
import Button from "@/component/button/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const [isEdit, setIsEdit] = useState(false);
  return (
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
          value={"이코치"}
          placeholder={"이코치"}
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
          label={"시작일자"}
          value={today}
          placeholder={today}
          className="h-14 lg:text-lg border-b-0"
        />

        <div className="col-span-2">
          <Input
            type={isEdit ? "text" : "div"}
            label={"수수료"}
            value={"10%"}
            placeholder={"10%"}
            className="h-14 lg:text-lg border-b-1"
          />
        </div>

        <div className="col-span-2">
          <Input
            type={isEdit ? "text" : "div"}
            label={"계좌번호"}
            value={"국민은행 000-000-00-000000"}
            placeholder={"국민은행 000-000-00-000000"}
            isLong={true}
            className="h-14 lg:text-lg border-t-0"
          />
        </div>
        <div className="col-span-2">
          <Input
            type={isEdit ? "text" : "div"}
            label={"비고"}
            value={"비고"}
            placeholder={""}
            isLong={true}
            className="h-14 lg:text-lg border-t-0 border-b-0"
          />
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
  );
};

export default Page;
