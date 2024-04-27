import React from "react";

import PayList from "@/component/page/pay/payList";
import PayHeader from "@/component/page/pay/payHeader";

const Page = ({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string; month?: string };
}) => {
  const query = searchParams?.query || "";
  const year = Number(searchParams?.year);
  const month = Number(searchParams?.month);

  return (
    <>
      <PayHeader />
      <PayList query={query} year={year} month={month} />
    </>
  );
};

export default Page;
