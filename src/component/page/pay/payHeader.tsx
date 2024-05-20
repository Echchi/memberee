"use client";
import React, { useState } from "react";
import MonthChanger from "@/component/monthChanger";
import Search from "@/component/search";
import Button from "@/component/button/button";
import DownloadPayListBtn from "@/component/page/pay/excelDownload/downloadPayListBtn";

const PayHeader = () => {
  const [desc, setDesc] = useState(true);

  return (
    <>
      <MonthChanger />
      <div className="my-3 flex justify-between">
        <Search placeholder={"이름,   연락처"} />
        <div className="hidden lg:block w-1/12">
          <DownloadPayListBtn />
        </div>
      </div>
    </>
  );
};

export default PayHeader;
