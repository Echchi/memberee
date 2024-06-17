import React from "react";
import { format, getMonth, getYear } from "date-fns";
import Button from "@/component/button/button";

import SalaryList from "@/component/page/salary/salaryList";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { Worker } from "@prisma/client";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";
import { PrintPdfBtn } from "@/component/pdf/printPdfBtn";

export interface WorkerWithMember extends Worker {
  Member: IMemberWithSchedules[];
}
async function getWorkersSalarys(year: number, month: number) {
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  const payDayDate = new Date(Date.UTC(year, month - 1, company?.payDay));
  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date()) + 1;
  const startDate = new Date(
    Date.UTC(year || thisYear, (month || thisMonth) - 1, 1),
  ); // 해당 월의 시작일
  const endDate = new Date(Date.UTC(year || thisYear, month || thisMonth, 0));
  const workers = await db.worker.findMany({
    where: {
      status: 1, // 직원이 활동 중인 상태
      companyId: companyId,
    },
    include: {
      Member: {
        where: {
          AND: [
            {
              Payment: {
                none: {
                  lessonFee: -1,
                  forYear: +year,
                  forMonth: +month,
                },
              },
            },
            {
              OR: [
                {
                  status: 1,
                },
                {
                  status: 0,
                  endDate: {
                    gte: payDayDate,
                  },
                },
                {
                  status: -1,
                  suspendedDate: {
                    gte: payDayDate,
                  },
                },
              ],
            },
          ],
        },
        include: {
          Schedule: true,
        },
      },
    },
  });

  // const updatedWorkers = await Promise.all(
  //   workers.map(async (worker) => {
  //     const updatedMembers = await Promise.all(
  //       worker.Member.map(async (member) => {
  //         const latestWorkerLog = await db.workerChangeLog.findFirst({
  //           where: {
  //             memberId: member.id,
  //             previousWorkerId: worker.id,
  //             changedDate: { lt: endDate },
  //           },
  //           orderBy: { changedDate: "desc" },
  //         });
  //
  //         // console.log("으휴 시발 샐러리", latestWorkerLog);
  //
  //         const memberToUse = latestWorkerLog
  //           ? latestWorkerLog &&
  //             isAfterYearMonth(latestWorkerLog.changedDate, startDate)
  //             ? await db.member.findUnique({
  //                 where: { id: latestWorkerLog.previousWorkerId },
  //               })
  //             : await db.member.findUnique({
  //                 where: { id: latestWorkerLog.workerId },
  //               })
  //           : member;
  //         return memberToUse;
  //       }),
  //     );
  //     return {
  //       ...worker,
  //       Member: updatedMembers,
  //     };
  //   }),
  // );

  return workers;
}

const Page = async ({
  searchParams,
}: {
  searchParams?: { year?: string; month?: string };
}) => {
  // const year = Number(searchParams?.year) || getYear(new Date());
  // const month = Number(searchParams?.month) || getMonth(new Date());
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;

  const workers = await getWorkersSalarys(year, month);

  return (
    <>
      {/*<MonthChanger />*/}

      {/*<div className="my-3 flex justify-end">*/}
      {/*  <div className="hidden xl:block w-1/12"></div>*/}
      {/*</div>*/}

      <SalaryList workers={workers} />
    </>
  );
};

export default Page;
