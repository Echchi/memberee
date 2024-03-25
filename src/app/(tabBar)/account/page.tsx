"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/component/input";
import { cls } from "@/libs/client/utils";
import Button from "@/component/button/button";
import UserData from "@/types/user";
import CompanyData from "@/types/company";
import { JoinData } from "@/app/join/page";

const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<JoinData>();

  const [isEdit, setIsEdit] = useState(false);

  const onValid = (data: JoinData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="box">
      <div className="px-3 w-full">
        {/*  유저 : 이름 아이디 비밀번호 휴대폰 번호 메일*/}
        <p className="font-semibold tracking-wide text-stone-600 pt-5 pb-3 ">
          관리자 정보
        </p>
        <Input
          label={"이름"}
          type={isEdit ? "text" : "div"}
          value={"장영준"}
          placeholder={"장영준"}
          className={"h-14 rounded-t-lg"}
          register={register("name")}
        />
        <Input
          label={"아이디"}
          type={isEdit ? "text" : "div"}
          value={"tennis"}
          placeholder={"tennis"}
          className={"h-14 border-t-0 border-b-1"}
          register={register("id")}
        />
        <Input
          label={"비밀번호"}
          type={isEdit ? "text" : "div"}
          value={"12345"}
          placeholder={"12345"}
          className={"h-14 border-t-0 border-b-1"}
          register={register("password")}
        />
        <Input
          label={"연락처"}
          type={isEdit ? "text" : "div"}
          value={"010-0000-0000"}
          placeholder={"010-0000-0000"}
          className={"h-14 border-t-0 border-b-1"}
          maxLength={11}
          register={register("phone", {
            maxLength: 11,
            pattern: {
              value: /^\d{11}$/,
              message: "휴대폰 번호는 11자리 숫자로 입력해주세요",
            },
          })}
          errorMessage={errors?.phone?.message}
        />
        <Input
          label={"이메일"}
          type={isEdit ? "text" : "div"}
          value={"id@tennis.com"}
          placeholder={"id@tennis.com"}
          className={"h-14 border-t-0 border-b-1 rounded-b-lg"}
          register={register("mail", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "이메일을 올바르게 입력해주세요",
            },
          })}
          errorMessage={errors?.mail?.message}
        />

        {/*  회사  : 이름, 연락처  */}
        <p className="font-semibold tracking-wide text-stone-600 pt-8 pb-3 ">
          업체 정보
        </p>

        <Input
          label={"업체명"}
          type={isEdit ? "text" : "div"}
          value={"테니스팡"}
          placeholder={"테니스팡"}
          className={"h-14 border-t-1 border-b-1 rounded-t-lg"}
          register={register("coName")}
        />
        <Input
          label={"연락처"}
          type={isEdit ? "text" : "div"}
          value={"010-0000-0000"}
          placeholder={"010-0000-0000"}
          className={"h-14 border-t-0 rounded-b-lg"}
          register={register("coContact", {
            maxLength: 11,
            pattern: {
              value: /^\d{11}$/,
              message: "휴대폰 번호는 11자리 숫자로 입력해주세요",
            },
          })}
        />
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
    </form>
  );
};

export default Page;
