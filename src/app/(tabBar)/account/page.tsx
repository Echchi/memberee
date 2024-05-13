"use client";
import React, { useEffect, useState } from "react";

import Input from "@/component/input";

import Button from "@/component/button/button";

import { JoinData } from "@/app/join/page";

import { getUser } from "@/app/(tabBar)/account/api";
import { User } from ".prisma/client";
import { formatPhone } from "@/libs/client/utils";
import { Company } from "@prisma/client";
import Modal from "@/component/modal";
import ConfirmModal from "@/component/modal/confirmModal";
import { changeStatusMember } from "@/app/(tabBar)/member/[id]/api";

const Page = () => {
  const [user, setUser] = useState<User | null>();
  const [company, setCompany] = useState<Company | null>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response) {
          const { user, ...company } = response;
          setUser(user);
          setCompany(company);
        }
      } catch (error) {
        return new Error("error fetch member");
      }
    };
    fetchUser();
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const onValid = (data: JoinData) => {
    console.log(data);
  };

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
              onConfirm={() =>
                changeStatusMember(+id, confirmType === "탈퇴" ? 0 : -1)
              }
            />
          }
        />
      )}

      <form className="box">
        <div className="px-3 w-full">
          {/*  유저 : 이름 아이디 비밀번호 휴대폰 번호 메일*/}
          <p className="font-semibold tracking-wide text-stone-600 pt-5 pb-3 lg:text-lg">
            관리자 정보
          </p>
          <Input
            label={"이름"}
            type={isEdit ? "text" : "div"}
            value={user?.name}
            placeholder={user?.name}
            className={"h-14 rounded-t-lg"}
            name={"name"}
          />
          <Input
            label={"아이디"}
            type={isEdit ? "text" : "div"}
            value={user?.userid}
            placeholder={user?.userid}
            className={"h-14 border-t-0 border-b-1"}
            name={"id"}
          />
          <Input
            label={"비밀번호"}
            type={isEdit ? "password" : "div"}
            value={"password"}
            placeholder={""}
            className={"h-14 border-t-0 border-b-1"}
            name={"password"}
          />
          <Input
            label={"연락처"}
            type={isEdit ? "text" : "div"}
            value={formatPhone(user?.phone || "")}
            placeholder={user?.phone}
            className={"h-14 border-t-0 border-b-1"}
            maxLength={11}
            name={"phone"}
          />
          <Input
            label={"이메일"}
            type={isEdit ? "text" : "div"}
            value={user?.email}
            placeholder={user?.email}
            className={"h-14 border-t-0 border-b-1 rounded-b-lg"}
            name={"mail"}
          />

          {/*  회사  : 이름, 연락처  */}
          <p className="font-semibold tracking-wide text-stone-600 pt-8 pb-3 lg:text-lg">
            업체 정보
          </p>

          <Input
            label={"업체명"}
            type={isEdit ? "text" : "div"}
            value={company?.name}
            placeholder={company?.name}
            className={"h-14 border-t-1 border-b-1 rounded-t-lg"}
            name={"coName"}
          />
          <Input
            label={"납부일"}
            name={"payDay"}
            required={true}
            className={"h-14 border-t-0"}
            type={isEdit ? "select" : "div"}
            selectDescription={"일"}
            value={company?.payDay + ""}
            options={Array.from({ length: 31 }, (_, index) => ({
              value: index + 1,
              label: (index + 1).toString(),
            }))}
          />
          <Input
            label={"연락처"}
            type={isEdit ? "text" : "div"}
            value={formatPhone(company?.contact || "")}
            placeholder={company?.contact || ""}
            className={"h-14 border-t-0 rounded-b-lg"}
            name={"coContact"}
          />
          <div className="flex justify-between mt-4">
            <Button
              text={isEdit ? "취소" : "탈퇴"}
              className="gray_btn !w-1/6"
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
    </>
  );
};

export default Page;
