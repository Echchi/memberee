"use client";
import React, { useState } from "react";
import MonthChanger from "@/component/monthChanger";
import Search from "@/component/search";
import Button from "@/component/button/button";
import DownloadPayListBtn from "@/component/page/pay/excelDownload/downloadPayListBtn";

const PayHeader = ({ year, month }: { year: number; month: number }) => {
  return (
    <>
      <div className="my-3 flex justify-between">
        <Search placeholder={"이름,   연락처"} />
        <div className="hidden xl:block w-1/12">
          {/*<DownloadPayListBtn year={year} month={month} />*/}
        </div>
      </div>
    </>
  );
};

export default PayHeader;
