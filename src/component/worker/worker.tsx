import React from "react";
import Link from "next/link";
import { DayOfWeek } from "@/component/dayOfWeek";
import db from "@/libs/server/db";
import { useFormState } from "react-dom";
import { formatPhone } from "@/libs/client/utils";
import { DAYOFWEEK } from "@/libs/constants";
export interface Worker {
  id: number;
  name: string;
  phone: string;
  dayOfWeek: string | null;
}

const Worker = async ({ workers }: { workers: Worker[] }) => {
  return (
    <>
      {workers &&
        workers.map((worker, index) => (
          <Link
            href={`/worker/${worker.id}`}
            key={worker.id}
            className="bg-white w-full min-h-fit shadow rounded-lg flex flex-col items-center p-4 hover:shadow-lg"
          >
            <div className="bg-stone-200 rounded-full h-32 w-32" />
            <div className="mt-4 flex flex-col items-center space-y-1">
              <p className="font-bold text-lg tracking-wider">{worker.name}</p>
              <p className="space-x-2">
                {worker?.dayOfWeek
                  ?.split("")
                  .map((day, index) => +day)
                  .sort()
                  .map((day) => `${DAYOFWEEK[+day]} ` || "")}
              </p>
              <p>{formatPhone(worker?.phone)}</p>
            </div>
          </Link>
        ))}
    </>
  );
};

export default Worker;
