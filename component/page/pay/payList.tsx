"use client";
import React, { useCallback, useEffect, useState } from "react";

import Pay from "./pay";
import PayMb from "./pay_mb";
import { getMembers } from "../../../app/(tabBar)/pay/api";
import { IMemberWithSchedules } from "../../../app/(tabBar)/member/[id]/page";
import { IWorker } from "../member/members";
import { getWorkerList } from "../../../app/(tabBar)/worker/register/api";
import Pagination from "../../pagination";
import Empty from "../../empty";
import { getPaidCnt, getTotalCnt } from "../../../app/(tabBar)/main/api";
import { getMonth, getYear } from "date-fns";

const PayList = ({
  query,
  year,
  month,
}: {
  query?: string;
  year?: number;
  month?: number;
}) => {
  const [members, setMembers] = useState<IMemberWithSchedules[]>();
  const [total, setTotal] = useState<number>();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [paidCnt, setPaidCnt] = useState<number>(0);
  const [workerId, setWorkerId] = useState<number>(-1);
  const [payStatus, setPayStatus] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const initYear = getYear(new Date());
  const initMonth = getMonth(new Date());
  const fetchMembers = useCallback(
    async (year: number, month: number, shouldSetLoading = false) => {
      console.log("1. fetchMembers");
      if (shouldSetLoading) {
        setLoading(true);
      }
      console.log(query, workerId, payStatus, page, year, month);
      try {
        const response = await getMembers({
          params: { query: query ?? "", workerId, payStatus, page },
          year: year ?? getYear(new Date()),
          month: month ?? getMonth(new Date()) + 1,
        });
        if (response) {
          setMembers(response.members);
          setTotal(response.total);
        }
      } catch (e) {
        console.error("Error fetching members:", e);
      } finally {
        setLoading(false);
      }
    },
    [query, workerId, payStatus, page],
  );

  const fetchPaidCounts = async (year: number, month: number) => {
    console.log("2. fetchPaidCounts");
    try {
      const paidResponse = await getPaidCnt(year, month);
      console.log("2-1. fetchPaidCounts result", paidResponse);
      setPaidCnt(paidResponse);
    } catch (e) {
      console.error("error fetch counts", e);
    }
  };

  const fetchtotalCounts = async (year: number, month: number) => {
    console.log("3. fetchtotalCounts");
    try {
      const totalResponse = await getTotalCnt(year, month);
      console.log("3-1. fetchtotalCounts result", totalResponse);
      setTotalCnt(totalResponse);
    } catch (e) {
      console.error("error fetch counts", e);
    }
  };

  const fetchWorkerList = async (year: number, month: number) => {
    console.log("4. fetchWorkerList");
    const workerList = await getWorkerList(year, month);

    const workersData = workerList.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    setWorkers(workersData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchMembers(year ?? initYear, month ?? initMonth, true),
        fetchWorkerList(year ?? initYear, month ?? initMonth),
        fetchtotalCounts(year ?? initYear, month ?? initMonth),
        fetchPaidCounts(year ?? initYear, month ?? initMonth),
      ]);
      setWorkerId(-1);
      setPayStatus(0);
    };
    fetchData();
  }, [year, month]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchMembers(year ?? initYear, month ?? initMonth, true);
  //     await fetchWorkerList(year ?? initYear, month ?? initMonth);
  //     await fetchtotalCounts(year ?? initYear, month ?? initMonth);
  //     await fetchPaidCounts(year ?? initYear, month ?? initMonth);
  //     setWorkerId(-1);
  //     setPayStatus(0);
  //   };
  //   fetchData();
  // }, [year, month]);

  useEffect(() => {
    fetchMembers(year ?? initYear, month ?? initMonth);
  }, [query, workerId, payStatus, page, fetchMembers]);

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
      <div className="hidden xl:block box mt-3">
        <div className="w-full">
          <p className="text-right mb-2">{`${paidCnt} 명 납부 / 총 ${totalCnt} 명`}</p>

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
                <td>수강료</td>
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
              {!loading && members
                ? members.map((member, index) => (
                    <Pay key={`pay_${member.id}`} member={member} />
                  ))
                : [...Array(10)].map((_, index) => (
                    <tr
                      key={`payList_loading_${index}`}
                      className="w-full *:h-14 *:rounded"
                    >
                      <td>
                        <div className="flex justify-center items-center">
                          <span className="w-2/3 skeleton rounded-lg h-8" />
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <span className="w-full skeleton rounded-lg h-8" />
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <span className="w-1/2 skeleton rounded-lg h-8" />
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <span className="w-1/2 skeleton rounded-lg h-8" />
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <span className="w-1/3 skeleton rounded-lg h-8" />
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <Pagination total={total || 0} page={page} setPage={setPage} />
          {members && members.length === 0 && <Empty item={"납부 내역"} />}
        </div>
      </div>

      <div className="xl:hidden flex flex-col space-y-3 mt-5">
        <PayMb
          members={members || []}
          payStatus={payStatus}
          setPayStatus={setPayStatus}
          setSlice={setPage}
          slice={page}
          loading={loading}
          query={query}
          year={year || 0}
          month={month || 0}
        />
      </div>
    </>
  );
};

export default PayList;