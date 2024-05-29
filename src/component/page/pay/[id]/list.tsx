"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { cls, dateFormattedtoKor, formatCurrency } from "@/libs/client/utils";
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
  workerId?: number;
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
  listItem,
  setListItem,
}: {
  payment: Payment[];
  member: IMemberWithSchedules;
  totalPeriod: string[];
  listItem: IPay[];
  setListItem: React.Dispatch<React.SetStateAction<IPay[]>>;
}) => {
  const [registerModal, setRegisterModalOpen] = useState(false);
  const [confirmModal, setConfirmModalOpen] = useState(false);
  // const [listItem, setListItem] = useState<IPay[]>([]);
  const [filterlistItem, setFilterListItem] = useState<IPay[]>([]);
  const [selectedPay, setSelectedPay] = useState<IPay | null>(null);
  const [yearList, setYearList] = useState<Set<string>>(new Set());
  const [year, setYear] = useState("");
  useEffect(() => {
    const newSet = new Set<string>();
    const items = totalPeriod.map((day, index) => {
      const year = day.slice(0, 4);
      newSet.add(year);
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
      const lessonFee = payment.find(
        (item) => item.forYear + "" === year && item.forMonth + "" === month,
      )?.lessonFee;

      return {
        id: id,
        memberId: member?.id,
        workerId: member?.workerId,
        year: year,
        month: month,
        method: method,
        lessonFee: lessonFee,
        memo: memo,
        paymentDate: paymentDate,
      };
    });
    setYearList(newSet);
    setListItem(items);
    console.log("pay Items", items);
  }, [totalPeriod, payment, member]);

  const handleClickPay = (item: IPay) => {
    setSelectedPay(item);
    setRegisterModalOpen(true);
  };
  const handleClickPayCheck = (item: IPay) => {
    setSelectedPay(item);
    setConfirmModalOpen(true);
  };

  const handleChangeYear = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    console.log(value);
    setYear(value);
  };

  useEffect(() => {
    if (year) {
      setFilterListItem(listItem.filter((item) => item.year === year));
    } else {
      setFilterListItem(listItem);
    }
  }, [year, listItem]);

  return (
    <>
      {registerModal && (
        <Modal
          onClose={() => setRegisterModalOpen(false)}
          title={"납부 등록"}
          content={
            <PayRegister
              param={selectedPay}
              lessonFee={
                (member?.Schedule &&
                  member?.Schedule[0] &&
                  member?.Schedule[0]?.lessonFee) ||
                0
              }
            />
          }
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
          member && member?.status <= 0 ? "*:bg-stone-100" : "",
        )}
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-stone-100 font-semibold text-base lg:text-lg text-center *:py-3">
              <td>
                <select
                  className="bg-transparent cursor-pointer outline-none"
                  onChange={(event) => handleChangeYear(event)}
                >
                  <option value={""}>연도</option>
                  {yearList &&
                    Array.from(yearList)
                      .sort((a, b) => Number(b) - Number(a))
                      .map((year) => (
                        <option key={`payList_${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                </select>
              </td>
              <td>월</td>
              <td className="hidden lg:table-cell">납부방법</td>
              <td className="hidden lg:table-cell">금액</td>
              <td>납부일자</td>
            </tr>
          </thead>
          <tbody>
            {filterlistItem
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
                    "*:py-3 text-center border-b border-stone-100",
                    (item && item?.lessonFee < 0) ||
                      (member && member.status < 0)
                      ? "bg-stone-100"
                      : "hover:bg-orange-100 cursor-pointer active:bg-orange-200 has-[button]:hover:bg-white has-[button]:hover:cursor-default has-[button]:active:bg-white",
                  )}
                >
                  <td>{item.year}</td>
                  <td>{item.month}</td>
                  <td className="hidden lg:table-cell">
                    {item.method ? item.method : "-"}
                  </td>
                  <td className="hidden lg:table-cell">
                    {item.method ? formatCurrency(item.lessonFee) : "-"}
                  </td>
                  <td>
                    {item.lessonFee < 0 ? (
                      <div className="mx-auto min-w-fit w-1/2 lg:w-1/4">
                        <Button
                          text={"중단"}
                          className="!bg-neutral-300 hover:!bg-neutral-300 active:!bg-neutral-300 !py-3 !cursor-default"
                          onClick={() => undefined}
                        />
                      </div>
                    ) : item.paymentDate ? (
                      <span> {dateFormattedtoKor(item.paymentDate)}</span>
                    ) : (
                      <div className="mx-auto min-w-fit w-1/2 lg:w-1/4">
                        <Button
                          text={"납부 등록"}
                          className={cls(
                            "!py-3",
                            member.status < 0
                              ? "!bg-neutral-300 hover:!bg-neutral-300 active:!bg-neutral-300"
                              : "!bg-amber-500 hover:!bg-amber-500/80 active:!bg-amber-600",
                          )}
                          onClick={
                            member.status < 0
                              ? undefined
                              : () => handleClickPay(item)
                          }
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
