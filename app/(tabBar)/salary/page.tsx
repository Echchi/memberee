"use server";
import React from "react";
import { format, getDate, getMonth, getYear } from "date-fns";
import Button from "../../../component/button/button";

import SalaryList from "../../../component/page/salary/salaryList";
import db from "../../../libs/server/db";
import getSession from "../../../libs/client/session";
import { Worker } from "@prisma/client";
import { IMemberWithSchedules } from "../member/[id]/page";
import { getCompany } from "../pay/[id]/api";
import { PrintPdfBtn } from "../../../component/pdf/printPdfBtn";

export interface WorkerWithMember extends Worker {
  Member: IMemberWithSchedules[];
}
async function getWorkersSalarys(year: number, month: number) {
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  const today = getDate(new Date());
  const payDayDate = new Date(
    Date.UTC(year, month - 1, company?.payDay ?? today),
  );
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
