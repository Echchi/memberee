"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import Tag from "@/component/tag";
import { useRouter } from "next/navigation";
import Button from "@/component/button";
import modal from "@/component/modal";
import Modal from "@/component/modal";
import PayCheck from "@/app/(auth)/pay/[id]/payCheck";
import PayRegister from "@/app/(auth)/pay/[id]/payRegister";

const Page = () => {
  const router = useRouter();
  const [yearDesc, setYearDesc] = useState(true);
  const [monthDesc, setMonthDesc] = useState(true);
  const [registerModal, setRegisterModalOpen] = useState(false);
  const [confirmModal, setConfirmModalOpen] = useState(false);
  const handleTrClick = () => {};
  return (
    <>
      {registerModal && (
        <Modal
          onClose={() => setRegisterModalOpen(false)}
          title={"납부 등록"}
          content={<PayRegister />}
        />
      )}
      {confirmModal && (
        <Modal
          onClose={() => setConfirmModalOpen(false)}
          title={"납부 확인"}
          content={<PayCheck />}
        />
      )}
      <div className="box flex-col">
        <div className="flex justify-end items-center">
          <div className="hidden md:flex items-center justify-end space-x-4 w-full *:w-32">
            <div>
              <Button
                onClick={() => router.push("/pay")}
                text={"목록"}
                className="my-2 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
              />
            </div>
            <div>
              <Button text="출력" className="my-2" />
            </div>
          </div>
        </div>
        <div className="hidden md:flex bg-stone-100 text-stone-600 pl-10 tracking-wider text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
          납부내역
        </div>
        <div
          className="grid md:grid-cols-2 w-full cursor-pointer"
          data-testid={"member-info"}
          onClick={() => router.push("/member/1")}
        >
          <Input
            type={"div"}
            label={"이름"}
            value={"양지윤"}
            className="h-16 md:border-t md:border-r-0 border-b-0 md:border-b lg:text-lg md:rounded-none rounded-t-lg"
          />
          <Input
            type={"div"}
            label={"담당"}
            value={"함코치"}
            className="h-16 md:border-t border-b lg:text-lg"
          />
          <Input
            type={"div"}
            label={"연락처"}
            value={"010-0000-0000"}
            className="h-16 border-t-0 border-b md:border-r-0 lg:text-lg"
          />
          <Input
            type={"div"}
            label={"연체/ 총 납부"}
            value={"1건 / 12건"}
            className="hidden md:flex h-16 border-t-0 border-b lg:text-lg"
          />
        </div>
        <div className="border border-stone-300 border-t-0 rounded-b-lg w-full h-[73\40px]">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">
                <td className="flex justify-center items-center">
                  연도
                  <svg
                    onClick={() => setYearDesc((prev) => !prev)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    월
                    <svg
                      onClick={() => setMonthDesc((prev) => !prev)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </div>
                </td>
                <td className="hidden md:block">납부방법</td>
                <td>납부일자</td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }, (_, index) => ({
                year: 2024,
                month: 1,
                method: index % 2 === 0 ? "계좌이체" : "",
                payDate: index % 2 === 0 ? "2024.01.01." : "",
              })).map((item, index) => (
                <tr
                  onClick={
                    item.method.length > 0 && item.payDate.length > 0
                      ? () => setConfirmModalOpen(true)
                      : undefined
                  }
                  key={index}
                  className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200 has-[button]:hover:bg-white has-[button]:hover:cursor-default has-[button]:active:bg-white"
                >
                  <td>{item.year}</td>
                  <td>{item.month}</td>
                  <td className="hidden md:block">
                    {item.method.length > 0 ? item.method : "-"}
                  </td>
                  <td>
                    {item.payDate.length > 0 ? (
                      item.payDate
                    ) : (
                      <div className="mx-auto min-w-fit w-1/2 md:w-1/4">
                        <Button
                          text={"납부 등록"}
                          className="!bg-amber-500 hover:!bg-amber-500/80 active:!bg-amber-600"
                          onClick={() => setRegisterModalOpen(true)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
