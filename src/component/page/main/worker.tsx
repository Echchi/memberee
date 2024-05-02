"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Workers from "@/component/page/worker/workers";
import { WorkerWithMember } from "@/app/(tabBar)/salary/page";
import Link from "next/link";
import { DAYOFWEEK } from "@/libs/constants";

const Worker = ({ workers }: { workers: WorkerWithMember[] }) => {
  const router = useRouter();
  return (
    <div
      className="box flex-col justify-center space-x-2 md:!py-2 cursor-pointer hover:shadow-lg"
      onClick={() => router.push("/worker")}
      data-testid="worker-mainbox"
    >
      <div className="box_title">직원 관리</div>
      <div className="flex overflow-x-auto">
        {workers &&
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
          ))}
      </div>
    </div>
  );
};

export default Worker;
