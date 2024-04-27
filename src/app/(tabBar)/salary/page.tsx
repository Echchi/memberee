import React, { useState } from "react";
import { addMonths, format } from "date-fns";
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
import { getWorkers } from "@/component/page/worker/workers";
import getSession from "@/libs/client/session";
export async function getSalarys(year: string, month: string) {
  const session = await getSession();
  const companyId = session.company;
  const salarys = await db.worker.findMany({
    where: {
      status: 1,
      companyId: companyId,
    },
    include: {
      Member: true,
      Schedule: true,
    },
  });
  return salarys;
}

const Page = async ({
  searchParams,
}: {
  searchParams?: { year?: string; month?: string };
}) => {
  const year = Number(searchParams?.year);
  const month = Number(searchParams?.month);
  const salarys = await getSalarys(year, month);

  return (
    <>
      <MonthChanger />
      <div className="my-3 flex justify-end">
        <div className="hidden lg:block w-1/12">
          <Button text={"출력"} className="py-3" />
        </div>
      </div>

      <SalaryList year={year} month={month} />
    </>
  );
};

export default Page;
