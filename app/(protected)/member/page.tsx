"use server";
import React from "react";

import Search from "../../../components/common/inputs/search";
import Members from "../../../components/page/member/members";

import RegisterBtn from "../../../components/page/member/registerBtn";
import DownloadMemberListBtn from "../../../components/page/member/excelDownload/downloadMemberListBtn";

const Page = ({ searchParams }: { searchParams?: { query?: string } }) => {
  const today = new Date();
  const query = searchParams?.query || "";

  return (
    <>
      <div className="my-3 flex justify-between items-center xl:space-x-0 space-x-4">
        <Search placeholder={"이름,   연락처"} />
        <div className="flex space-x-3 w-1/4">
          <RegisterBtn />
          <DownloadMemberListBtn />
        </div>
      </div>

      <Members query={query} />
    </>
  );
};

export default Page;
