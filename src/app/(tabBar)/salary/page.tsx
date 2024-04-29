import React from "react";
import { addMonths, format, getMonth, getYear } from "date-fns";
import MonthChanger from "@/component/monthChanger";
import Input from "@/component/input";
import Button from "@/component/button/button";
import Tag from "@/component/tag";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/libs/client/utils";
import Modal from "@/component/modal";
import PayRegister from "@/app/(tabBar)/pay/[id]/payRegister";
import SalaryDetail from "@/app/(tabBar)/salary/salaryDetail";
import SalaryList from "@/component/page/salary/salaryList";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { Member, Schedule, Worker } from "@prisma/client";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";

export interface WorkerWithMember extends Worker {
  Member: IMemberWithSchedules[];
}
export async function getWorkersSalarys(year: string, month: string) {
  const session = await getSession();
  const companyId = session.company;
  const workers = await db.worker.findMany({
    where: {
      status: 1,
      companyId: companyId,
    },
    include: {
      Member: {
        where: {
          status: 1,
        },
        include: {
          Schedule: true,
        },
      },
    },
  });
  console.log("workers", workers);
  return workers;
}

const Page = async ({
  searchParams,
}: {
  searchParams?: { year?: string; month?: string };
}) => {
  const year = searchParams?.year || getYear(new Date()) + "";
  const month = searchParams?.month || getMonth(new Date()) + "";
  const workers = await getWorkersSalarys(year, month);

  return (
    <>
      <MonthChanger />
      <div className="my-3 flex justify-end">
        <div className="hidden lg:block w-1/12">
          <Button text={"출력"} className="py-3" />
        </div>
      </div>

      <SalaryList workers={workers} />
    </>
  );
};

export default Page;
