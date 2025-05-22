"use server";
import React from "react";

import PayList from "../../../component/page/pay/payList";
import PayHeader from "../../../component/page/pay/payHeader";
import { getMonth, getYear } from "date-fns";
import MonthChanger from "../../../component/monthChanger";
import getSession from "../../../libs/client/session";

const Page = async ({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string; month?: string };
}) => {
  const session = await getSession();
  const paymentType = session.paymentType!!;
  const query = searchParams?.query || "";
  const year = Number(searchParams?.year || getYear(new Date()));
  const month = Number(searchParams?.month || getMonth(new Date()) + 1);

  return (
    <>
      <MonthChanger type={"pay"} />
      <PayHeader year={year} month={month} paymentType={paymentType} />
      <PayList
        query={query}
        year={year}
        month={month}
        paymentType={paymentType}
      />
    </>
  );
};

export default Page;
