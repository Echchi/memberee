"use client";
import React, { useEffect, useState } from "react";
import { cls, dateFormattedtoKor } from "@/libs/client/utils";
import Button from "@/component/button/button";
import Modal from "@/component/modal";

import PayCheck from "@/app/(tabBar)/pay/[id]/payCheck";
import { Member } from "@prisma/client";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { Payment } from ".prisma/client";
import PayRegister from "@/app/(tabBar)/pay/[id]/payRegister";
import Tag from "@/component/tag";

export interface IPay {
  id?: number;
  memberId?: number;
  year: string;
  month: string;
  method: string | null | undefined;
  lessonFee: any;
  memo: any;
  paymentDate: Date | null | undefined;
}

const List = ({
  payment,
  member,
  totalPeriod,
}: {
  payment: Payment[];
  member: IMemberWithSchedules;
  totalPeriod: string[];
}) => {
  const [registerModal, setRegisterModalOpen] = useState(false);
  const [confirmModal, setConfirmModalOpen] = useState(false);
  const [listItem, setListItem] = useState<IPay[]>([]);
  const [selectedPay, setSelectedPay] = useState<IPay | null>(null);

  useEffect(() => {
    const items = totalPeriod.map((day, index) => {
      const year = day.slice(0, 4);
      const month = day.slice(4);
      const id = payment.find(
        (item) => item.forYear + "" === year && item.forMonth + "" === month,
      )?.id;
      const method = payment.find(
        (item) => item.forYear + "" === year && item.forMonth + "" === month,
      )?.paymentMethod;
      const memo = payment.find(
        (item) => item.forYear + "" === year && item.forMonth + "" === month,
      )?.memo;
      const paymentDate = payment.find(
        (item) => item.forYear + "" === year && item.forMonth + "" === month,
      )?.paymentDate;
      return {
        id: id,
        memberId: member?.id,
        year: year,
        month: month,
        method: method,
        lessonFee: member?.Schedule?.[0]?.lessonFee + "",
        memo: memo,
        paymentDate: paymentDate,
      };
    });
    setListItem(items);
  }, [totalPeriod, payment, member]);

  const handleClickPay = (item: IPay) => {
    setSelectedPay(item);
    setRegisterModalOpen(true);
  };
  const handleClickPayCheck = (item: IPay) => {
    setSelectedPay(item);
    setConfirmModalOpen(true);
  };

  return (
    <>
      {registerModal && (
        <Modal
          onClose={() => setRegisterModalOpen(false)}
          title={"납부 등록"}
          content={<PayRegister param={selectedPay} />}
        />
      )}
      {confirmModal && (
        <Modal
          onClose={() => setConfirmModalOpen(false)}
          title={"납부 확인"}
          content={<PayCheck param={selectedPay} />}
        />
      )}
      <div
        className={cls(
          "border border-stone-300 border-t-0 rounded-b-lg w-full h-[73\x20px]",
          member && member?.status < 0 ? "*:bg-stone-100" : "",
        )}
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">
              <td className="flex justify-center items-center">
                연도
                <svg
                  // onClick={() => setYearDesc((prev) => !prev)}
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
                    // onClick={() => setMonthDesc((prev) => !prev)}
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
            {listItem
              .sort((a, b) => {
                if (Number(b.year) !== Number(a.year)) {
                  return Number(b.year) - Number(a.year);
                }
                return Number(b.month) - Number(a.month);
              })
              .map((item, index) => (
                <tr
                  onClick={
                    item?.method && item?.paymentDate && item.lessonFee >= 0
                      ? () => handleClickPayCheck(item)
                      : undefined
                  }
                  key={index}
                  className={cls(
                    "*:py-3 text-center border-b border-stone-100  ",
                    member && member?.status < 0
                      ? ""
                      : "hover:bg-orange-100 cursor-pointer active:bg-orange-200 has-[button]:hover:bg-white has-[button]:hover:cursor-default has-[button]:active:bg-white",
                  )}
                >
                  <td>{item.year}</td>
                  <td>{item.month}</td>
                  <td className="hidden md:block">
                    {item.method ? item.method : "-"}
                  </td>
                  <td>
                    {item.lessonFee < 0 ? (
                      <span className="text-xs">
                        <Tag color={"yellow"} title={"중단"} />
                      </span>
                    ) : item.paymentDate ? (
                      <span> {dateFormattedtoKor(item.paymentDate)}</span>
                    ) : (
                      <div className="mx-auto min-w-fit w-1/2 md:w-1/4">
                        <Button
                          text={"납부 등록"}
                          className="!bg-amber-500 hover:!bg-amber-500/80 active:!bg-amber-600 !py-3"
                          onClick={() => handleClickPay(item)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
