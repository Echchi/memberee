"use client";
import React, { useEffect, useState } from "react";
import {
  calculateLessonFee,
  calculateSalary,
  formatCurrency,
} from "@/libs/client/utils";

import { useRouter } from "next/navigation";

import { WorkerWithMember } from "@/app/(tabBar)/salary/page";

const Salary = ({
  worker,
  openDetailModal,
  setOpenDetailModal,
  setClickedWorker,
}: {
  worker: WorkerWithMember;
  openDetailModal: boolean;
  setOpenDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWorker: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const [totalLessonFee, setTotalLessonFee] = useState(0);
  const handleClickLessonFee = (workerId: number) => {
    setClickedWorker(workerId);
    setOpenDetailModal(true);
  };
  useEffect(() => {
    setTotalLessonFee(calculateLessonFee(worker.Member));
  }, [worker]);

  return (
    <>
      <td
        className="cursor-pointer"
        onClick={() => router.push(`/worker/${worker?.id}`)}
      >
        {worker?.name}
      </td>
      <td
        className="cursor-pointer"
        onClick={() => router.push(`/worker/${worker?.id}`)}
      >
        {worker.Member.length} 명
      </td>
      <td
        className="cursor-pointer"
        onClick={() => handleClickLessonFee(worker.id)}
      >
        {formatCurrency(totalLessonFee)} 원
      </td>
      <td className="relative group cursor-pointer hover:text-orange-500 transition-all">
        {worker?.commission} %
        <div className="*:text-xs xl:*:text-base text-gray-700 shadow absolute bg-orange-200 right-3/4 xl:left-3/4 top-1/2 z-10 w-fit space-y-2 rounded p-3 hidden group-hover:block">
          <p className="text-sm whitespace-pre">
            수업료 {formatCurrency(totalLessonFee)} * 수수료{" "}
            {worker?.commission}% =
          </p>
          <p className="font-semibold">
            {formatCurrency(
              (totalLessonFee * (worker?.commission || 0)) / 100 || 0,
            )}
          </p>
        </div>
      </td>
      <td className="relative group cursor-pointer hover:text-orange-500 transition-all">
        3.3 %
        <div className="*:text-xs xl:*:text-base text-gray-700 shadow absolute bg-orange-200 right-3/4 top-1/2 z-10 w-fit space-y-2 rounded p-3 hidden group-hover:block">
          <p className="text-sm whitespace-pre">
            수업료 {formatCurrency(totalLessonFee)} * 수수료{" "}
            {worker?.commission}% * 부담금 3.3% =
          </p>
          <p className="font-semibold">
            {formatCurrency(
              ((totalLessonFee * (worker?.commission || 0)) / 100 || 0) *
                (1 - 0.033),
            )}
          </p>
        </div>
      </td>
      <td>
        {formatCurrency(calculateSalary(totalLessonFee, worker?.commission))}원
      </td>
    </>
  );
};

export default Salary;
