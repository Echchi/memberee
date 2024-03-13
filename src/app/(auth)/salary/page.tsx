"use client";
import React, { useState } from "react";
import { addMonths, format } from "date-fns";
import MonthChanger from "@/component/monthChanger";
import Input from "@/component/input";
import Button from "@/component/button/button";
import Tag from "@/component/tag";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/libs/client/utils";
import Modal from "@/component/modal";
import PayRegister from "@/app/(auth)/pay/[id]/payRegister";
import SalaryDetail from "@/app/(auth)/salary/salaryDetail";

const Page = () => {
  const today = new Date();
  const router = useRouter();
  const [month, setMonth] = useState(today);
  const [detailModal, setDetailModal] = useState(false);
  return (
    <>
      {detailModal && (
        <Modal
          onClose={() => setDetailModal(false)}
          title={"회원 수업료"}
          content={<SalaryDetail />}
        />
      )}
      <MonthChanger month={month} setMonth={setMonth} />
      <div className="my-3 flex justify-end">
        <div className="hidden lg:block w-1/12">
          <Button text={"출력"} className="py-3" />
        </div>
      </div>

      <div className="box mt-3">
        <div className="w-full">
          <table className="w-full table-auto">
            <thead className="sticky top-20">
              <tr className="text-xs lg:text-lg bg-stone-100 font-semibold text-center *:py-3">
                <td>이름</td>
                <td>담당 회원 수</td>
                <td>회원 수업료</td>
                <td>수수료</td>
                <td>부담금</td>
                <td>예상 임금</td>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              <tr className="text-xs lg:text-base *:py-3 text-center border-b border-stone-100">
                <td
                  className="cursor-pointer"
                  onClick={() => router.push("/worker/1")}
                >
                  함코치
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => router.push("/worker/1")}
                >
                  20 명
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => setDetailModal(true)}
                >
                  {formatCurrency(220000 * 20)} 원
                </td>
                <td>50 %</td>
                <td>3.3 %</td>
                <td>
                  {formatCurrency(
                    220000 * 20 * 0.5 - 220000 * 20 * 0.5 * 0.033,
                  )}{" "}
                  원
                </td>
              </tr>
              <tr className="text-xs lg:text-base *:py-3 text-center border-b border-stone-100">
                <td
                  className="cursor-pointer"
                  onClick={() => router.push("/worker/1")}
                >
                  이코치
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => router.push("/worker/1")}
                >
                  30 명
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => setDetailModal(true)}
                >
                  {formatCurrency(220000 * 30)} 원
                </td>
                <td>50 %</td>
                <td>3.3 %</td>
                <td>
                  {formatCurrency(
                    220000 * 30 * 0.5 - 220000 * 30 * 0.5 * 0.033,
                  )}{" "}
                  원
                </td>
              </tr>
              <tr className="text-xs lg:text-base *:py-3 text-center border-b border-stone-100">
                <td
                  className="cursor-pointer"
                  onClick={() => router.push("/worker/1")}
                >
                  장코치
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => router.push("/worker/1")}
                >
                  20 명
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => setDetailModal(true)}
                >
                  {formatCurrency(220000 * 20)} 원
                </td>
                <td>100 %</td>
                <td>3.3 %</td>
                <td>
                  {formatCurrency(
                    220000 * 20 * 1.0 - 220000 * 20 * 1.0 * 0.033,
                  )}{" "}
                  원
                </td>
              </tr>{" "}
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr className="text-xs lg:text-base *:py-3 text-center border-b border-stone-100 bg-stone-100">
                <td>합계</td>
                <td>70 명</td>
                <td>{formatCurrency(220000 * 70)} 원</td>
                <td>-</td>
                <td>-</td>
                <td>
                  {formatCurrency(
                    220000 * 20 * 1.0 - 220000 * 20 * 1.0 * 0.033,
                  )}{" "}
                  원
                </td>
              </tr>{" "}
              <tr className="text-xs lg:text-base *:bold *:text-lg sticky bottom-0 *:py-3 text-center border-b border-stone-100 bg-orange-100">
                <td colSpan={4}>예상 수익</td>

                <td colSpan={2}>{formatCurrency(5826700)} 원</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
