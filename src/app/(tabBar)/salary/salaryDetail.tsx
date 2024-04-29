import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/libs/client/utils";
import { Member } from "@prisma/client";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { DAYOFWEEK } from "@/libs/constants";
import { setState } from "jest-circus";

const SalaryDetail = ({
  members,
}: {
  members: IMemberWithSchedules[] | null;
}) => {
  const [totalLessonFee, setTotalLessonFee] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  useEffect(() => {
    const totalLessonFee =
      members?.reduce((total, member) => {
        const firstLessonFee = member?.Schedule?.[0]?.lessonFee || 0;
        return total + firstLessonFee;
      }, 0) || 0;
    setTotalLessonFee(totalLessonFee);
  }, [members]);

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
          {members &&
            members.map((member, index) => (
              <tr
                key={index}
                className="*:py-3 text-center border-b border-stone-100"
              >
                <td>{member.name}</td>

                <td>
                  {member?.Schedule?.map((sh) => DAYOFWEEK[sh.dayOfWeek])}
                </td>
                <td>
                  {formatCurrency(
                    (member?.Schedule && member?.Schedule[0].lessonFee) || 0,
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className="sticky bottom-0">
          <tr className="text-xs lg:text-base font-semibold *:py-3 text-center border-stone-100 bg-stone-100">
            <td>합계</td>
            <td>{members?.length} 명</td>
            <td>{formatCurrency(totalLessonFee)} 원</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SalaryDetail;
