"use client";
import React, { useState } from "react";
import { formatCurrency } from "@/libs/client/utils";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { useRouter } from "next/navigation";
import Modal from "@/component/modal";
import SalaryDetail from "@/app/(tabBar)/salary/salaryDetail";

const Salary = ({
  worker,
  detailModal,
  setDetailModal,
}: {
  worker: IWorker;
  detailModal: boolean;
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <>
      <td
        className="cursor-pointer"
        onClick={() => router.push(`/worker/${worker.id}`)}
      >
        함코치
      </td>
      <td
        className="cursor-pointer"
        onClick={() => router.push(`/worker/${worker.id}`)}
      >
        20 명
      </td>
      <td className="cursor-pointer" onClick={() => setDetailModal(true)}>
        {formatCurrency(220000 * 20)} 원
      </td>
      <td>50 %</td>
      <td>3.3 %</td>
      <td>
        {formatCurrency(220000 * 20 * 0.5 - 220000 * 20 * 0.5 * 0.033)} 원
      </td>
    </>
  );
};

export default Salary;
