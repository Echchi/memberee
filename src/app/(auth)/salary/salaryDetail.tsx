import React from "react";
import { formatCurrency } from "@/libs/client/utils";

const SalaryDetail = () => {
  return (
    <div className="w-full border border-neutral-300 rounded-b-lg h-[40vh] overflow-y-auto rounded-t-lg">
      <table className="w-full table-auto">
        <thead>
          <tr className="sticky top-0 bg-stone-100 font-semibold text-center *:py-3">
            <td>이름</td>

            <td>
              <select className="bg-transparent outline-none focus:outline-none">
                <option>요일</option>
                <option>월</option>
                <option>화</option>
                <option>수</option>
                <option>목</option>
                <option>금</option>
                <option>토</option>
                <option>일</option>
              </select>
            </td>
            <td className="flex justify-center items-center">수업료</td>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, index) => ({
            name: `이름 ${index + 1}`,
            dayOfWeek: "화 목 금",
            amount: 220000,
          })).map((item, index) => (
            <tr
              key={index}
              className="*:py-3 text-center border-b border-stone-100"
            >
              <td>{item.name}</td>

              <td>{item.dayOfWeek}</td>
              <td>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0">
          <tr className="text-xs lg:text-base font-semibold *:py-3 text-center border-stone-100 bg-stone-100">
            <td>합계</td>
            <td>70 명</td>
            <td>{formatCurrency(220000 * 70)} 원</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SalaryDetail;
