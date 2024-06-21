"use client";
import React, { useEffect, useState } from "react";

import Input from "@/component/input";

import Button from "@/component/button/button";

import { getUser, terminateUser } from "@/app/(tabBar)/account/api";
import { User } from ".prisma/client";
import { cls, formatPhone } from "@/libs/client/utils";
import { Company } from "@prisma/client";
import Modal from "@/component/modal";
import ConfirmModal from "@/component/modal/confirmModal";
import { useFormState } from "react-dom";
import { updateUser } from "@/app/(tabBar)/account/action";
import ChangePassword from "@/app/(tabBar)/account/changePassword";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      console.time("account getUser");
      try {
        const response = await getUser();
        if (response) {
          const { user, ...company } = response;
          user && setUser(user);
          setCompany(company);
        } else {
          setUser(null);
          setCompany(null);
        }
      } catch (error) {
        return new Error("error fetch member");
      }
    };
    fetchUser();
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const [state, action] = useFormState(updateUser, null);

  return (
    <>
      {isConfirmOpen && (
        <Modal
          title={""}
          onClose={() => setIsConfirmOpen(false)}
          content={
            <ConfirmModal
              name={user?.name || ""}
              action={`탈퇴`}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => terminateUser(Number(user?.id))}
              terminate={true}
            />
          }
        />
      )}
      {isChangePasswordOpen && (
        <Modal
          onClose={() => setIsChangePasswordOpen(false)}
          title={"비밀번호 변경"}
          content={
            <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />
          }
        />
      )}

      <form className="mt-3 xl:mt-0 xl:box overflow-y-auto" action={action}>
        <div className="px-3 w-full">
          {/*  유저 : 이름 아이디 비밀번호 휴대폰 번호 메일*/}
          <p className="font-semibold tracking-wide text-stone-600 py-3 xl:pt-5 xl:pb-3 xl:text-lg">
            관리자 정보
          </p>
          <Input
            label={"이름"}
            type={isEdit ? "text" : "div"}
            value={user?.name}
            placeholder={user?.name}
            className={"h-16 rounded-t-lg"}
            name={"username"}
            errorMessage={state?.fieldErrors?.username}
          />
          {!isEdit && (
            <Input
              label={"아이디"}
              type={isEdit ? "text" : "div"}
              value={user?.userid}
              placeholder={user?.userid}
              className={"h-16 border-t-0 border-b-1"}
              name={"id"}
            />
          )}
          {isEdit ? (
            <div className="relative hidden xl:flex items-center w-full border border-stone-300 border-t-0 bg-white h-18">
              <span className="text-sm xl:text-lg text-stone-600 max-w-24 xl:max-w-full absolute inset-y-0 left-0 flex flex-nowrap items-center xl:pl-10 pl-4 whitespace-pre-line font-semibold">
                비밀번호
              </span>
              <div className="inner_input_res xl:px-48 px-20 !h-full">
                <Button
                  text={"비밀번호 변경"}
                  type={"button"}
                  className="w-fit xl:!w-1/6"
                  onClick={() => setIsChangePasswordOpen(true)}
                />
              </div>
            </div>
          ) : (
            <Input
              label={"비밀번호"}
              type={"div"}
              value={user?.userid ? "••••••••" : ""}
              placeholder={""}
              className={"h-16 border-t-0 border-b-1"}
              name={"password"}
            />
          )}

          <Input
            label={"연락처"}
            type={isEdit ? "text" : "div"}
            value={isEdit ? user?.phone : formatPhone(user?.phone || "")}
            placeholder={user?.phone}
            className={"h-16 border-t-0 border-b-1"}
            maxLength={11}
            name={"phone"}
            errorMessage={state?.fieldErrors?.phone}
          />
          <Input
            label={"이메일"}
            type={isEdit ? "text" : "div"}
            value={user?.email}
            placeholder={user?.email}
            className={"h-16 border-t-0 border-b-1 rounded-b-lg"}
            name={"email"}
            errorMessage={state?.fieldErrors?.email}
          />

          {/*  회사  : 이름, 연락처  */}
          <p className="font-semibold tracking-wide text-stone-600 pt-5 pb-3 xl:pt-8 xl:pb-3 xl:text-lg">
            업체 정보
          </p>

          <Input
            label={"업체명"}
            type={isEdit ? "text" : "div"}
            value={company?.name}
            placeholder={company?.name}
            className={"h-16 border-t-1 border-b-1 rounded-t-lg"}
            name={"co_name"}
            errorMessage={state?.fieldErrors?.co_name}
          />
          <Input
            label={"납부일"}
            name={"payDay"}
            required={true}
            className={"h-16 border-t-0"}
            type={isEdit ? "select" : "div"}
            selectDescription={company?.payDay ? "일" : ""}
            value={company?.payDay ? company?.payDay + "" : ""}
            options={Array.from({ length: 31 }, (_, index) => ({
              value: index + 1,
              label: (index + 1).toString(),
            }))}
            errorMessage={state?.fieldErrors?.payDay}
          />

          <Input
            label={"연락처"}
            type={isEdit ? "text" : "div"}
            value={
              isEdit
                ? (company?.contact as string)
                : formatPhone(company?.contact || "")
            }
            placeholder={company?.contact || ""}
            className={"h-16 border-t-0 rounded-b-lg"}
            maxLength={11}
            name={"co_contact"}
            errorMessage={state?.fieldErrors?.co_contact}
          />
          <div className="flex justify-between mt-4">
            <div className="flex w-full space-x-4">
              <Button
                text={isEdit ? "취소" : "탈퇴"}
                className={cls(" !w-1/6", isEdit ? "gray_btn" : "red_btn")}
                type="button"
                onClick={
                  isEdit ? () => setIsEdit(false) : () => setIsConfirmOpen(true)
                }
              />
            </div>
            {isEdit ? (
              <Button text={"완료"} className="!w-1/6 py-3" type="submit" />
            ) : (
              <Button
                text={"수정"}
                className="!w-1/6 py-3"
                type="button"
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  setIsEdit(true);
                }}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
