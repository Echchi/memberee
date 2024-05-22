"use client";
import React from "react";

import PayList from "@/component/page/pay/payList";
import PayHeader from "@/component/page/pay/payHeader";
import { getMonth, getYear } from "date-fns";
import MonthChanger from "@/component/monthChanger";

const Page = ({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string; month?: string };
}) => {
  const query = searchParams?.query || "";
  const year = Number(searchParams?.year || getYear(new Date()));
  const month = Number(searchParams?.month || getMonth(new Date()) + 1);

  return (
    <>
      <MonthChanger />
      <PayHeader year={year} month={month} />
      <PayList query={query} year={year} month={month} />
    </>
  );
};

export default Page;
