"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { useRouter } from "next/navigation";
import Button from "@/component/button/button";
import { getMember } from "@/app/(tabBar)/member/[id]/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { cls, formatPhone, generatePaymentDates } from "@/libs/client/utils";
import { Payment } from ".prisma/client";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";
import List from "@/component/page/pay/[id]/list";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [yearDesc, setYearDesc] = useState(true);
  const [monthDesc, setMonthDesc] = useState(true);

  const [member, setMember] = useState<IMemberWithSchedules>();
  const [payment, setPayment] = useState<Payment[]>([]);
  const [paymentCnt, setPaymentCnt] = useState(0);
  const [paymonth, setPayMonth] = useState<string[]>([]);
  const [totalPeriod, setTotalPeriod] = useState<string[]>([]);

  const id = params.id;
  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (id) {
          const response = await getMember(+id);
          console.log("getMember", response);
          if (response) {
            setMember(response);
            const paymentsArray = Array.isArray(response.Payment)
              ? response.Payment
              : [response.Payment].filter(Boolean);
            setPayment(paymentsArray as Payment[]);
          }
        }
      } catch (error) {
        return new Error("error fetch member");
      }
    };

    fetchMember();
  }, [id]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getCompany();
        if (response) {
          const total =
            member?.startDate &&
            generatePaymentDates(member?.startDate, response.payDay);
          setTotalPeriod(total || []);
        }
      } catch (error) {
        return new Error("error fetch company");
      }
    };
    fetchCompany();
  }, [member]);

  // useEffect(() => {
  //   console.log("totalPeriod", totalPeriod);
  // }, [totalPeriod]);

  useEffect(() => {
    setPaymentCnt(payment.length);

    payment.map((item) =>
      setPayMonth((prev) => [...prev, `${item.forYear}${item.forMonth}`]),
    );
  }, [payment]);

  return (
    <>
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
        <div className=" border border-x border-b-0 hidden md:flex bg-stone-100 text-stone-600 tracking-wider text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
          납부내역
        </div>
        <div
          className={cls(
            "grid md:grid-cols-2 w-full cursor-pointer",
            member && member?.status < 0 ? "*:bg-stone-100" : "",
          )}
          data-testid={"member-info"}
          onClick={() => router.push(`/member/${member?.id}`)}
        >
          <Input
            type={"div"}
            label={"이름"}
            value={member?.name}
            className="h-16 md:border-r-0 lg:text-lg md:rounded-none rounded-t-lg"
          />
          <Input
            type={"div"}
            label={"담당"}
            value={member?.worker?.name}
            className="h-16 lg:text-lg"
          />
          <Input
            type={"div"}
            label={"연락처"}
            value={formatPhone(member?.phone || "미등록")}
            className="h-16 border-t-0 md:border-r-0 lg:text-lg"
          />
          <Input
            type={"div"}
            label={"미납/ 총 납부"}
            value={`${totalPeriod.length - paymentCnt}건 / ${totalPeriod.length}건`}
            className="hidden md:flex h-16 border-t-0 lg:text-lg"
          />
        </div>
        {member && (
          <List member={member} payment={payment} totalPeriod={totalPeriod} />
        )}
        {/*<div*/}
        {/*  className={cls(*/}
        {/*    "border border-stone-300 border-t-0 rounded-b-lg w-full h-[73\x20px]",*/}
        {/*    member && member?.status < 0 ? "*:bg-stone-100" : "",*/}
        {/*  )}*/}
        {/*>*/}
        {/*  <table className="w-full table-auto">*/}
        {/*    <thead>*/}
        {/*      <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">*/}
        {/*        <td className="flex justify-center items-center">*/}
        {/*          연도*/}
        {/*          <svg*/}
        {/*            onClick={() => setYearDesc((prev) => !prev)}*/}
        {/*            xmlns="http://www.w3.org/2000/svg"*/}
        {/*            fill="none"*/}
        {/*            viewBox="0 0 24 24"*/}
        {/*            strokeWidth={1.5}*/}
        {/*            stroke="currentColor"*/}
        {/*            className="w-6 h-6 ml-2"*/}
        {/*          >*/}
        {/*            <path*/}
        {/*              strokeLinecap="round"*/}
        {/*              strokeLinejoin="round"*/}
        {/*              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"*/}
        {/*            />*/}
        {/*          </svg>*/}
        {/*        </td>*/}
        {/*        <td>*/}
        {/*          <div className="flex justify-center items-center">*/}
        {/*            월*/}
        {/*            <svg*/}
        {/*              onClick={() => setMonthDesc((prev) => !prev)}*/}
        {/*              xmlns="http://www.w3.org/2000/svg"*/}
        {/*              fill="none"*/}
        {/*              viewBox="0 0 24 24"*/}
        {/*              strokeWidth={1.5}*/}
        {/*              stroke="currentColor"*/}
        {/*              className="w-6 h-6 ml-2"*/}
        {/*            >*/}
        {/*              <path*/}
        {/*                strokeLinecap="round"*/}
        {/*                strokeLinejoin="round"*/}
        {/*                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"*/}
        {/*              />*/}
        {/*            </svg>*/}
        {/*          </div>*/}
        {/*        </td>*/}
        {/*        <td className="hidden md:block">납부방법</td>*/}
        {/*        <td>납부일자</td>*/}
        {/*      </tr>*/}
        {/*    </thead>*/}
        {/*    <tbody>*/}
        {/*      {Array.from({ length: 12 }, (_, index) => ({*/}
        {/*        year: 2024,*/}
        {/*        month: 1,*/}
        {/*        method: index % 2 === 0 ? "계좌이체" : "",*/}
        {/*        payDate: index % 2 === 0 ? "2024.01.01." : "",*/}
        {/*      })).map((item, index) => (*/}
        {/*        <tr*/}
        {/*          onClick={*/}
        {/*            item.method.length > 0 && item.payDate.length > 0*/}
        {/*              ? () => setConfirmModalOpen(true)*/}
        {/*              : undefined*/}
        {/*          }*/}
        {/*          key={index}*/}
        {/*          className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200 has-[button]:hover:bg-white has-[button]:hover:cursor-default has-[button]:active:bg-white"*/}
        {/*        >*/}
        {/*          <td>{item.year}</td>*/}
        {/*          <td>{item.month}</td>*/}
        {/*          <td className="hidden md:block">*/}
        {/*            {item.method.length > 0 ? item.method : "-"}*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            {item.payDate.length > 0 ? (*/}
        {/*              item.payDate*/}
        {/*            ) : (*/}
        {/*              <div className="mx-auto min-w-fit w-1/2 md:w-1/4">*/}
        {/*                <Button*/}
        {/*                  text={"납부 등록"}*/}
        {/*                  className="!bg-amber-500 hover:!bg-amber-500/80 active:!bg-amber-600 !py-3"*/}
        {/*                  onClick={() => setRegisterModalOpen(true)}*/}
        {/*                />*/}
        {/*              </div>*/}
        {/*            )}*/}
        {/*          </td>*/}
        {/*        </tr>*/}
        {/*      ))}*/}
        {/*    </tbody>*/}
        {/*  </table>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Page;
