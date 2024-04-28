"use client";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/libs/client/utils";

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
    const totalLessonFee =
      worker.Member?.reduce((total, member) => {
        const firstLessonFee = member?.Schedule?.[0]?.lessonFee || 0;
        return total + firstLessonFee;
      }, 0) || 0;
    setTotalLessonFee(totalLessonFee);
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
        {formatCurrency(
          totalLessonFee * (1 - (worker?.commission || 0) / 100) * (1 - 0.033),
        )}
        원
      </td>
    </>
  );
};

export default Salary;
