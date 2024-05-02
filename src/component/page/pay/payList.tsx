"use server";
import React, { useEffect } from "react";
import { getMembers } from "@/component/page/member/members";
import Pay from "./pay";
import PayMb from "@/component/page/pay/pay_mb";

const PayList = async ({
  query,
  year,
  month,
  setDesc,
}: {
  query?: string;
  year?: number;
  month?: number;
  setDesc?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const members = await getMembers(query || "", year, month);
  return (
    <>
      <div className="hidden lg:block box mt-3">
        <div className="w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">
                <td>이름</td>
                <td>연락처</td>
                <td>
                  <select className="bg-transparent outline-none focus:outline-none">
                    <option>담당</option>
                    <option>함코치</option>
                    <option>이코치</option>
                    <option>장코치</option>
                  </select>
                </td>

                <td>
                  <select className="bg-transparent outline-none focus:outline-none">
                    <option>납부여부</option>
                    <option>납부</option>
                    <option>미납</option>
                    <option>중단</option>
                  </select>
                </td>
                {/*<td className="w-24">연체여부</td>*/}
              </tr>
            </thead>
            <tbody>
              {members &&
                members
                  .sort((a, b) => {
                    const aHasPayment =
                      a.status === 0
                        ? -2
                        : a.Payment.length > 0
                          ? a.Payment[0]?.lessonFee < 0
                            ? -1
                            : 0
                          : 1;
                    const bHasPayment =
                      b.status === 0
                        ? -2
                        : b.Payment.length > 0
                          ? b.Payment[0]?.lessonFee < 0
                            ? -1
                            : 0
                          : 1;
                    return bHasPayment - aHasPayment;
                  })
                  .map((member, index) => (
                    <Pay key={`pay+${member.id}`} member={member} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden flex flex-col space-y-3 mt-5">
        <PayMb members={members} />
      </div>
    </>
  );
};

export default PayList;
