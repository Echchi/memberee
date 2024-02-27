"use client";
import React, { useState } from "react";
import Input from "@/component/input";
import Button from "@/component/button";
import Modal from "@/component/modal";
import Register from "./register/page";

const Page = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <>
      {registerModalOpen && (
        <Modal
          title={"직원 등록"}
          content={<Register />}
          onClose={() => setRegisterModalOpen(false)}
          className={"md:w-2/3"}
        />
      )}

      <div className="my-3 flex justify-between items-center lg:space-x-0 space-x-4">
        <Input
          type="text"
          placeholder="이름"
          icon={
            <span className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          }
          className="rounded-xl border-0 h-12 bg-stone-100 w-full lg:w-1/2"
        />
        <div className="flex space-x-3 w-1/12">
          <Button
            onClick={() => setRegisterModalOpen(true)}
            text={"직원 등록"}
            className="mt-0 py-3  lg:mt-5 !bg-emerald-500 hover:!bg-emerald-500/80 active:!bg-emerald-600"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-3 *:cursor-pointer *:transition-all ">
        <div className="bg-white w-full min-h-fit shadow rounded-lg flex flex-col items-center p-4 hover:shadow-lg">
          <div className="bg-stone-200 rounded-full h-32 w-32" />
          <div className="mt-4 flex flex-col items-center space-y-1">
            <p className="font-bold text-lg tracking-wider">함코치</p>
            <p>월요일, 화요일</p>
            <p>010-0000-0000</p>
          </div>
        </div>
        <div className="bg-white w-full min-h-fit shadow rounded-lg flex flex-col items-center p-4 hover:shadow-lg">
          <div className="bg-stone-200 rounded-full h-32 w-32" />
          <div className="mt-4 flex flex-col items-center space-y-1">
            <p className="font-bold text-lg tracking-wider">이코치</p>
            <p>월요일, 화요일</p>
            <p>010-0000-0000</p>
          </div>
        </div>
        <div className="bg-white w-full min-h-fit shadow rounded-lg flex flex-col items-center p-4 hover:shadow-lg">
          <div className="bg-stone-200 rounded-full h-32 w-32" />
          <div className="mt-4 flex flex-col items-center space-y-1">
            <p className="font-bold text-lg tracking-wider">장코치</p>
            <p>토요일, 일요일</p>
            <p>010-0000-0000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
