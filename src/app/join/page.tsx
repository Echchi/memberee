"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/component/input";
import { cls } from "@/libs/client/utils";
import Button from "@/component/button/button";
import UserData from "@/types/user";
import CompanyData from "@/types/company";
import FormButton from "@/component/button/formButton";
import { useFormState } from "react-dom";
import { createAccount } from "@/app/join/action";
export interface JoinData extends UserData, CompanyData {}

const Join = () => {
  const [state, action] = useFormState(createAccount, null);
  return (
    <form
      action={action}
      className="md:pt-10 md:max-w-full md:w-[1400px] md:mx-auto px-3 md:px-32 text-stone-800"
      data-testid="join-form"
    >
      <div className="flex flex-col justify-center items-center mt-8">
        <h3 className="text-5xl font-extrabold ml-3 text-emerald-700">
          memberee
        </h3>
        <h3 className="text-black py-2">누구나 편하게 쓰기 쉬운 회원관리</h3>
      </div>

      <div className="px-3 mt-4 mb-8">
        {/*  유저 : 이름 아이디 비밀번호 휴대폰 번호 메일*/}
        <p className="font-semibold tracking-wide text-stone-600 pt-5 pb-3 ">
          관리자 정보
        </p>
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"이름"}
          required={true}
          className={"h-14 rounded-t-lg"}
          name={"username"}
          errorMessage={state?.fieldErrors.username}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"아이디"}
          required={true}
          className={"h-14 border-t-0 border-b-1"}
          name={"userid"}
          errorMessage={state?.fieldErrors.userid}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"비밀번호"}
          required={true}
          className={"h-14 border-t-0 border-b-1"}
          name={"password"}
          errorMessage={state?.fieldErrors.password}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"비밀번호 확인"}
          required={true}
          className={"h-14 border-t-0 border-b-1"}
          name={"confirm_password"}
          errorMessage={state?.fieldErrors.confirm_password}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"휴대폰 번호"}
          required={true}
          className={"h-14 border-t-0 border-b-1"}
          maxLength={11}
          errorMessage={state?.fieldErrors.phone}
          name={"phone"}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
          }
          type={"text"}
          placeholder={"이메일"}
          required={true}
          className={"h-14 border-t-0 border-b-1 rounded-b-lg"}
          errorMessage={state?.fieldErrors.email}
          name={"email"}
        />
        {/*  회사  : 이름, 연락처  */}
        <p className="font-semibold tracking-wide text-stone-600 pt-8 pb-3 ">
          업체 정보
        </p>
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
              <path
                fillRule="evenodd"
                d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"업체명"}
          required={true}
          className={"h-14 border-t-1 border-b-1 rounded-t-lg"}
          name={"co_name"}
          errorMessage={state?.fieldErrors.co_name}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"사업자 등록 번호를 숫자로만 입력해주세요"}
          required={true}
          className={"h-14 border-t-0"}
          name={"co_num"}
          maxLength={10}
          errorMessage={state?.fieldErrors.co_num}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          name={"payDay"}
          required={true}
          className={"h-14 border-t-0"}
          type={"select"}
          selectDescription={"일이 납부일이에요"}
          options={Array.from({ length: 31 }, (_, index) => ({
            value: index + 1,
            label: (index + 1).toString(),
          }))}
        />
        <Input
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          type={"text"}
          placeholder={"연락처"}
          required={true}
          className={"h-14 border-t-0 rounded-b-lg"}
          name={"co_contact"}
          errorMessage={state?.fieldErrors.co_contact}
        />
        {/*<div className="pl-2 py-4 text-gray-500 flex items-center">*/}
        {/*  위치정보 서비스 동의*/}
        {/*  <input*/}
        {/*    {...register("locationService", { required: true })}*/}
        {/*    className="ml-3 accent-emerald-700"*/}
        {/*    type="checkbox"*/}
        {/*    name="locationService"*/}
        {/*    value={"true"}*/}
        {/*  />*/}
        {/*</div>*/}
        <FormButton text={"회원가입"} className={"mt-5"} />
      </div>
    </form>
  );
};

export default Join;
