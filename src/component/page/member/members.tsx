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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const fetchMembers = async () => {
      try {
        const response = await getMembers({
          params: {
            query: query || "",
            workerId,
            dayOfWeek,
            startDateOrder,
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
  }, [query, workerId, dayOfWeek, startDateOrder, page]);

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
  const handleChangeDayOfWeek = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDayOfWeek(Number(value));
  };
  const handleClickCreateDateOrder = () => {
    setCreateDateOrder((prev) => !prev);
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
              {members &&
                members?.length > 0 &&
                members?.map((member, index) => (
                  <Member member={member} key={member.id} />
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
