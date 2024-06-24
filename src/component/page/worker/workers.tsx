"use server";
import React from "react";
import Link from "next/link";
import { DayOfWeek } from "@/component/dayOfWeek";
import db from "@/libs/server/db";
import { useFormState } from "react-dom";
import { formatPhone } from "@/libs/client/utils";
import { DAYOFWEEK } from "@/libs/constants";
import getSession from "@/libs/client/session";
import session from "@/libs/client/session";
import Empty from "@/component/empty";
export interface Worker {
  id: number;
  name: string;
  phone: string;
  dayOfWeek: string | null;
}

export async function getWorkers(query?: string) {
  const session = await getSession();
  const companyId = session.company;

  const workers = await db.worker.findMany({
    where: {
      status: 1,
      companyId: companyId,
      ...(query && {
        name: {
          contains: query?.toLowerCase(),
        },
      }),
    },
    include: {
      Member: true,
    },
  });
  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  return workers || [];
}
const Workers = async ({ query }: { query?: string }) => {
  console.time("getWorkers");
  const workers = await getWorkers(query || "");
  console.timeEnd("getWorkers");
  return (
    <>
      {workers.length > 0 ? (
        workers.map((worker, index) => (
          <Link
            href={`/worker/${worker.id}`}
            key={worker.id}
            className="bg-white w-full min-h-fit shadow rounded-lg flex flex-col items-center p-4 hover:shadow-lg"
          >
            <div className="bg-stone-200 rounded-full h-32 w-32 flex justify-center items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-neutral-400 w-20 h-20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-4 flex flex-col items-center space-y-1">
              <p className="font-bold text-lg tracking-wider">{worker.name}</p>
              <p className="space-x-2">
                {worker?.dayOfWeek
                  ?.split("")
                  .map((day, index) => +day)
                  .sort()
                  .map((day) => `${DAYOFWEEK[+day]} ` || "")
                  .join("  ")}
              </p>
              <p>{formatPhone(worker?.phone)}</p>
            </div>
          </Link>
        ))
      ) : (
        <Empty item={"직원"} />
      )}
    </>
  );
};

export default Workers;
