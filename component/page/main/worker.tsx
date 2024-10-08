"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Workers from "../worker/workers";
import { WorkerWithMember } from "../../../app/(tabBar)/salary/page";
import Link from "next/link";
import { DAYOFWEEK } from "../../../libs/constants";
import Modal from "../../modal/modal";

import WorkerExcelModal from "./BulkUploadHandlers/worker/workerExcelModal";
import { PaymentType } from "@prisma/client";

const Worker = ({ workers }: { workers: WorkerWithMember[] }) => {
  const router = useRouter();
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  return (
    <>
      {isWorkerModalOpen && (
        <Modal
          title={"직원 엑셀 등록"}
          content={
            <WorkerExcelModal onClose={() => setIsWorkerModalOpen(false)} />
          }
          className={"w-full h-full xl:!w-4/5 xl:!h-4/5"}
          onClose={() => setIsWorkerModalOpen(false)}
        />
      )}
      <div
        className="box flex-col justify-center space-x-2 xl:!py-2 cursor-pointer hover:shadow-lg"
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
                className="flex flex-col justify-evenly items-center rounded-lg min-x-fit px-8 py-2 hover:bg-stone-100 cursor-pointer transition-all"
              >
                {/*<div className="rounded-full bg-gray-300 mb-4 h-32 aspect-square" />*/}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-gray-400 w-10 h-10  mb-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-base xl:text-lg font-semibold">
                  {worker.name}
                </p>
                <p className="text-sm xl:text-base font-medium whitespace-nowrap">
                  {worker.dayOfWeek
                    ?.split("")
                    .sort((a, b) => Number(a) - Number(b))
                    .map((day) => DAYOFWEEK[Number(day)])
                    .join("  ")}
                </p>
              </Link>
            ))
          ) : (
            <div className="grow px-5 py-2">
              <div className="h-20 mb-4 grow flex flex-col items-center justify-center space-y-3 font-semibold text-xl text-green-700 hover:text-green-700/80 transition-all cursor-pointer ">
                <div className="animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>
                </div>
                <p>등록된 직원이 없습니다</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Worker;
