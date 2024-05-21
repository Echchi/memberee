"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { useRouter } from "next/navigation";
import Button from "@/component/button/button";
import { getMember } from "@/app/(tabBar)/member/[id]/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import {
  cls,
  dateFormattedtoKor,
  formatPhone,
  generatePaymentDates,
} from "@/libs/client/utils";
import { Payment } from ".prisma/client";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";
import List, { IPay } from "@/component/page/pay/[id]/list";
import Tag from "@/component/tag";
import DownloadPayDetailBtn from "@/component/page/pay/[id]/excelDownload/downloadPayDetailBtn";
import { format } from "date-fns";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [yearDesc, setYearDesc] = useState(true);
  const [monthDesc, setMonthDesc] = useState(true);
  const [member, setMember] = useState<IMemberWithSchedules>();
  const [payment, setPayment] = useState<Payment[]>([]);
  const [stopPeriod, setStopPeriod] = useState(0);
  const [paymentCnt, setPaymentCnt] = useState(0);
  const [paymonth, setPayMonth] = useState<string[]>([]);
  const [totalPeriod, setTotalPeriod] = useState<string[]>([]);
  const [listItem, setListItem] = useState<IPay[]>([]);
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
    if (payment.length > 0) {
      const stopMonths = payment.filter(
        (item) => item && item.lessonFee != null && item?.lessonFee < 0,
      );
      setStopPeriod(stopMonths?.length || 0);
    }
  }, [payment]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getCompany();
        if (response) {
          const total =
            member?.startDate &&
            (member?.endDate
              ? generatePaymentDates(
                  member?.startDate,
                  response.payDay,
                  true,
                  member?.endDate,
                )
              : generatePaymentDates(member?.startDate, response.payDay));

          setTotalPeriod(total || []);
        }
      } catch (error) {
        return new Error("error fetch company");
      }
    };
    fetchCompany();
  }, [member]);

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
          <div className="relative hidden md:flex items-center justify-end space-x-4 w-full *:w-32">
            {member?.status === 0 && (
              <Tag
                color={"stone"}
                title={`${dateFormattedtoKor(member?.endDate)} 탈퇴`}
                className={"!w-fit !py-4 *:!font-bold !px-4"}
              />
            )}
            {member && member?.status < 0 && (
              <p className="absolute left-0 rounded-full bg-amber-400 py-2 px-4 text-amber-700 font-semibold !w-fit">
                {format(member?.suspendedDate || "", "yyyy년 MM월 dd일")} 부터
                중단 상태의 회원입니다
              </p>
            )}
            <div>
              <Button
                onClick={() => router.push("/pay")}
                text={"목록"}
                className="my-2 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
              />
            </div>
            <div>
              {/*<Button text="출력" className="my-2" />*/}
              <DownloadPayDetailBtn
                member={member || null}
                listItem={listItem}
                record={`${paymentCnt}건 / ${totalPeriod.length - stopPeriod}건`}
              />
            </div>
          </div>
        </div>
        <div className=" border border-x border-b-0 hidden md:flex bg-stone-100 text-stone-600 tracking-wider text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
          납부내역
        </div>
        <div
          className={cls(
            "grid md:grid-cols-2 w-full cursor-pointer",
            member && member?.status <= 0 ? "*:bg-stone-100" : "",
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
            label={"납부/ 총 납부"}
            value={`${paymentCnt}건 / ${totalPeriod.length - stopPeriod}건`}
            className="hidden md:flex h-16 border-t-0 lg:text-lg"
          />
        </div>
        {member && (
          <List
            member={member}
            payment={payment}
            totalPeriod={totalPeriod}
            listItem={listItem}
            setListItem={setListItem}
          />
        )}
      </div>
    </>
  );
};

export default Page;
