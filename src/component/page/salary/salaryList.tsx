"use client";
import React, { useState } from "react";
import { formatCurrency } from "@/libs/client/utils";
import Salary from "@/component/page/salary/salary";
import Modal from "@/component/modal";
import SalaryDetail from "@/app/(tabBar)/salary/salaryDetail";

const SalaryList = ({
  year,
  month,
  setDesc,
}: {
  year?: number;
  month?: number;
  setDesc?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                <Salary
                  detailModal={detailModal}
                  setDetailModal={setDetailModal}
                />
              </tr>
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
              </tr>
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

export default SalaryList;
