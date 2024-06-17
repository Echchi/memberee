"use client";
import React, { useEffect, useState } from "react";

import Member from "./member";

import MemberMb from "./member_mb";

import Empty from "@/component/empty";
import { getMembers } from "@/app/(tabBar)/member/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";
import Pagination from "@/component/pagination";
import Mobile from "@/app/(tabBar)/member/mobile";
import { getPaidCnt, getTotalCnt } from "@/app/(tabBar)/main/api";
import { getMonth, getYear } from "date-fns";

export interface IWorker {
  id: number;
  name: string;
}

const Members = ({
  query,
  setDesc,
}: {
  query?: string;
  setDesc?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [members, setMembers] = useState<IMemberWithSchedules[]>();
  const [total, setTotal] = useState<number>();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [workerId, setWorkerId] = useState<number>();
  const [dayOfWeek, setDayOfWeek] = useState<number>();
  const [startDateOrder, setCreateDateOrder] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCnt, setTotalCnt] = useState<number>(0);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.time("member getMembers");
        const response = await getMembers({
          params: {
            query: query || "",
            workerId,
            dayOfWeek,
            startDateOrder,
            page,
          },
        });
        console.timeEnd("member getMembers");
        if (response) {
          setMembers(response.members);
          setTotal(response.total);
          setLoading(false);
        }
      } catch (e) {
        return new Error("error fetch members");
      }
    };

    fetchMembers();

    setLoading(false);
  }, [query, workerId, dayOfWeek, startDateOrder, page]);

  useEffect(() => {
    const fetchWorkerList = async () => {
      console.time("member getWorkerList");
      const workerList = await getWorkerList();
      const workersData = workerList.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      console.timeEnd("member getWorkerList");
      setWorkers(workersData);
    };

    const fetchCounts = async () => {
      try {
        console.time("member getTotalCnt");
        const totalResponse = await getTotalCnt(
          getYear(new Date()),
          getMonth(new Date()),
        );
        console.timeEnd("member getTotalCnt");
        if (totalResponse) {
          setTotalCnt(totalResponse);
        }
      } catch (e) {
        console.error("error fetch counts", e);
      }
    };

    fetchWorkerList();
    fetchCounts();
  }, []);
  const handleChangeWorkerList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setWorkerId(Number(value));
  };
  const handleChangeDayOfWeek = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDayOfWeek(Number(value));
  };
  const handleClickCreateDateOrder = () => {
    setCreateDateOrder((prev) => !prev);
  };

  return (
    <>
      <div className="hidden xl:block box mt-3">
        <div className="w-full">
          <p className="text-right mb-2">{`총 ${totalCnt} 명`}</p>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">
                <td>이름</td>
                <td>연락처</td>
                <td>
                  <select
                    className="bg-transparent outline-none focus:outline-none"
                    onChange={(e) => handleChangeWorkerList(e)}
                  >
                    <option value={-1}>담당</option>
                    {workers &&
                      workers.map((worker) => (
                        <option
                          key={`members_workerList_${worker.id}`}
                          value={worker.id}
                        >
                          {worker.name}
                        </option>
                      ))}
                  </select>
                </td>

                <td>
                  <select
                    className="bg-transparent outline-none focus:outline-none"
                    onChange={(e) => handleChangeDayOfWeek(e)}
                  >
                    <option value={0}>요일</option>
                    <option value={1}>월</option>
                    <option value={2}>화</option>
                    <option value={3}>수</option>
                    <option value={4}>목</option>
                    <option value={5}>금</option>
                    <option value={6}>토</option>
                    <option value={7}>일</option>
                  </select>
                </td>
                <td
                  className="flex justify-center items-center cursor-pointer"
                  onClick={handleClickCreateDateOrder}
                >
                  시작일
                  {startDateOrder ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </td>
              </tr>
            </thead>
            <tbody>
              {!loading && members && members?.length > 0
                ? members?.map((member, index) => (
                    <Member member={member} key={member.id} />
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
          {members && members.length === 0 && <Empty item={"회원"} />}
        </div>
      </div>
      <Mobile
        query={query}
        members={members || []}
        setSlice={setPage}
        loading={loading}
      />
    </>
  );
};

export default Members;
