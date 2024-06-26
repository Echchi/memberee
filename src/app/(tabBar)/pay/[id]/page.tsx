"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { notFound, useRouter } from "next/navigation";
import Button from "@/component/button/button";
import { getMember } from "@/app/(tabBar)/member/[id]/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import {
  cls,
  dateFormattedtoKor,
  formatCurrency,
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
  const [loading, setLoading] = useState(true);
  const id = params.id;
  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (id) {
          // console.time("pay getMember");
          const response = await getMember(+id);
          // console.timeEnd("pay getMember");
          if (response) {
            setMember(response);
            const paymentsArray = Array.isArray(response.Payment)
              ? response.Payment
              : [response.Payment].filter(Boolean);
            setPayment(paymentsArray as Payment[]);
            setLoading(false);
          }
        }
      } catch (error) {
        return router.replace("/404");
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
        // console.time("pay getCompany");
        const response = await getCompany();
        // console.timeEnd("pay getCompany");
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
      <div className="mt-3 xl:mt-0 xl:box flex-col">
        <div className="flex justify-end items-center">
          <div className="relative hidden xl:flex items-center justify-end space-x-4 w-full *:w-32">
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
              <DownloadPayDetailBtn
                member={member || null}
                listItem={listItem}
                record={`${paymentCnt}건 / ${totalPeriod.length - stopPeriod}건`}
              />
            </div>
          </div>
        </div>
        <div className=" border border-x border-b-0 flex bg-stone-100 text-stone-600 tracking-wider text-lg xl:text-xl font-extrabold items-center border-stone-300 justify-center h-16 rounded-t-lg ">
          납부내역
        </div>
        <div
          className={cls(
            "grid xl:grid-cols-2 w-full cursor-pointer",
            member && member?.status <= 0 ? "*:bg-stone-100" : "",
          )}
          data-testid={"member-info"}
          onClick={() => router.push(`/member/${member?.id}`)}
        >
          <Input
            type={"div"}
            label={"이름"}
            value={member?.name}
            className="h-16 xl:border-r-0 xl:text-lg"
          />
          <Input
            type={"div"}
            label={"담당"}
            value={member?.worker?.name}
            className="h-16 xl:text-lg"
          />
          <Input
            type={"div"}
            label={"연락처"}
            value={formatPhone(member?.phone || "")}
            className="h-16 border-t-0 xl:border-r-0 xl:text-lg"
          />
          <Input
            type={"div"}
            label={"납부/ 총 납부"}
            value={`${paymentCnt}건 / ${totalPeriod.length - stopPeriod}건`}
            className="hidden xl:flex h-16 border-t-0 xl:text-lg"
          />
        </div>
        {!loading && member ? (
          <List
            member={member}
            payment={payment}
            totalPeriod={totalPeriod}
            listItem={listItem}
            setListItem={setListItem}
          />
        ) : (
          <div className="border border-stone-300 border-t-0 rounded-b-lg w-full h-[73\x20px]">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-stone-100 font-semibold text-base xl:text-lg text-center *:py-3">
                  <td>연도</td>
                  <td>월</td>
                  <td className="hidden xl:table-cell">납부방법</td>
                  <td className="hidden xl:table-cell">금액</td>
                  <td>납부일자</td>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={`pay_detail_loading_${index}`} className="*:h-14">
                    <td>
                      <div className="flex justify-center items-center">
                        <span className="w-2/3 skeleton rounded-lg h-8" />
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <span className="w-2/3 skeleton rounded-lg h-8" />
                      </div>
                    </td>
                    <td className="hidden xl:table-cell">
                      <div className="flex justify-center items-center">
                        <span className="w-2/3 skeleton rounded-lg h-8" />
                      </div>
                    </td>
                    <td className="hidden xl:table-cell">
                      <div className="flex justify-center items-center">
                        <span className="w-2/3 skeleton rounded-lg h-8" />
                      </div>
                    </td>
                    <td className="hidden xl:table-cell">
                      <div className="flex justify-center items-center">
                        <span className="w-2/3 skeleton rounded-lg h-8" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
