"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Workers from "@/component/page/worker/workers";
import { WorkerWithMember } from "@/app/(tabBar)/salary/page";
import Link from "next/link";
import { DAYOFWEEK } from "@/libs/constants";
import Modal from "@/component/modal";
import MemoModal from "@/component/modal/memoModal";
import ExcelModal from "@/component/page/main/excelModal";

const Worker = ({ workers }: { workers: WorkerWithMember[] }) => {
  const router = useRouter();
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  return (
    <>
      {isWorkerModalOpen && (
        <Modal
          title={"직원 엑셀 등록"}
          content={<ExcelModal />}
          className={"!w-4/5 !h-4/5"}
          onClose={() => setIsWorkerModalOpen(false)}
        />
      )}
      <div
        className="box flex-col justify-center space-x-2 md:!py-2 cursor-pointer hover:shadow-lg"
        onClick={() =>
          workers.length > 0
            ? router.push("/worker")
            : setIsWorkerModalOpen(true)
        }
        data-testid="worker-mainbox"
      >
        <div className="box_title">직원 관리</div>

        <div className="flex overflow-x-auto">
          {workers?.length > 0 ? (
            workers.map((worker) => (
              <Link
                href={`/worker/${worker.id}`}
                key={`main_worker_${worker.id}`}
                className="flex flex-col justify-evenly items-center rounded-lg min-x-fit px-5 py-2 hover:bg-stone-100 cursor-pointer transition-all"
              >
                <div className="rounded-full bg-gray-300 mb-4 h-20 w-20" />
                <p className="text-base md:text-lg font-semibold">
                  {worker.name}
                </p>
                <p className="text-sm md:text-base font-medium whitespace-nowrap">
                  {worker.dayOfWeek
                    ?.split("")
                    .map((day) => DAYOFWEEK[Number(day)])
                    .join("")}
                </p>
              </Link>
            ))
          ) : (
            <div className="grow px-5 py-2">
              <div className="h-20 mb-4 grow flex flex-col items-center justify-center space-y-3 font-semibold text-xl text-stone-400 hover:text-stone-500 transition-all cursor-pointer">
                <p>등록된 직원이 없습니다</p>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Worker;
