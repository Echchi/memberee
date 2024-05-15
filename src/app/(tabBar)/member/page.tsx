import React from "react";

import Button from "@/component/button/button";

import Search from "@/component/search";
import Members from "@/component/page/member/members";

import RegisterBtn from "@/component/page/member/registerBtn";

const Page = ({ searchParams }: { searchParams?: { query?: string } }) => {
  const today = new Date();
  const query = searchParams?.query || "";

  return (
    <>
      <div className="my-3 flex justify-between items-center lg:space-x-0 space-x-4">
        <Search placeholder={"이름,   연락처"} />
        <div className="flex space-x-3 w-1/4">
          <RegisterBtn />

          <Button text={"명단 출력"} className="py-3 hidden lg:block" />
        </div>
      </div>

      <Members query={query} />
    </>
  );
};

export default Page;
