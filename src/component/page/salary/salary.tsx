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
      <td>{worker?.commission} %</td>
      <td>3.3 %</td>
      <td>
        {formatCurrency(calculateSalary(totalLessonFee, worker?.commission))}원
      </td>
    </>
  );
};

export default Salary;
