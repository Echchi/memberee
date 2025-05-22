"use server";
import React from "react";
import Input from "../../../components/common/inputs/input";
import RegisterModal from "./registerModal";
import Workers from "../../../components/page/worker/workers";
import Search from "../../../components/common/inputs/search";
import Button from "../../../components/button/button";

const Page = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const query = searchParams?.query || "";

  return (
    <>
      <div className="my-3 flex justify-between items-center xl:space-x-0 space-x-4">
        <Search placeholder={"이름"} />

        <RegisterModal />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-3 *:cursor-pointer *:transition-all ">
        <Workers query={query} />
      </div>
    </>
  );
};

export default Page;
