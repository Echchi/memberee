"use client";
import React, { useEffect, useState } from "react";

import Pay from "./pay";
import PayMb from "@/component/page/pay/pay_mb";
import { getMembers } from "@/app/(tabBar)/member/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { IWorker } from "@/component/page/member/members";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";
import Pagination from "@/component/pagination";
import Empty from "@/component/empty";

const PayList = ({
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
  const [members, setMembers] = useState<IMemberWithSchedules[]>();
  const [total, setTotal] = useState<number>();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [workerId, setWorkerId] = useState<number>(-1);
  const [payStatus, setPayStatus] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMembers = async () => {
      try {
        const response = await getMembers({
          params: {
            query: query || "",
            year,
            month,
            workerId,
            payStatus,
            page,
          },
        });

        if (response) {
          console.log(response);
          setMembers(response.members);
          setTotal(response.total);
        }
      } catch (e) {
        return new Error("error fetch members");
      }
    };
    fetchMembers();
    setLoading(false);
  }, [query, workerId, page, payStatus, year, month]);

  useEffect(() => {
    const fetchWorkerList = async () => {
      const workerList = await getWorkerList();
      const workersData = workerList.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setWorkers(workersData);
    };

    fetchWorkerList();
  }, []);
  const handleChangeWorkerList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setWorkerId(Number(value));
  };

  const handleChangePay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPayStatus(Number(value));
  };
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
                  <select
                    className="bg-transparent outline-none focus:outline-none cursor-pointer"
                    onChange={(e) => handleChangeWorkerList(e)}
                  >
                    <option value={-1}>담당</option>
                    {workers &&
                      workers.map((worker) => (
                        <option
                          key={`payment_workerList_${worker.id}`}
                          value={worker.id}
                        >
                          {worker.name}
                        </option>
                      ))}
                  </select>
                </td>

                <td>
                  <select
                    className="bg-transparent outline-none focus:outline-none cursor-pointer"
                    onChange={(e) => handleChangePay(e)}
                  >
                    <option value={0}>납부여부</option>
                    <option value={1}>납부</option>
                    <option value={-1}>미납</option>
                  </select>
                </td>
                {/*<td className="w-24">연체여부</td>*/}
              </tr>
            </thead>
            <tbody>
              {members &&
                members
                  // .sort((a, b) => {
                  //   const aHasPayment =
                  //     a.status === 0
                  //       ? -2
                  //       : a.Payment.length > 0
                  //         ? a.Payment[0]?.lessonFee < 0
                  //           ? -1
                  //           : 0
                  //         : 1;
                  //   const bHasPayment =
                  //     b.status === 0
                  //       ? -2
                  //       : b.Payment.length > 0
                  //         ? b.Payment[0]?.lessonFee < 0
                  //           ? -1
                  //           : 0
                  //         : 1;
                  //   return bHasPayment - aHasPayment;
                  // })
                  .map((member, index) => (
                    <Pay key={`pay_${member.id}`} member={member} />
                  ))}
            </tbody>
          </table>
          <Pagination total={total || 0} page={page} setPage={setPage} />
          {members && members.length === 0 && <Empty item={"납부 내역"} />}
        </div>
      </div>

      <div className="lg:hidden flex flex-col space-y-3 mt-5">
        <PayMb members={members || []} payStatus={payStatus} />
      </div>
    </>
  );
};

export default PayList;
