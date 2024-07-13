import React from "react";
import Input from "../../../component/input";
import RegisterModal from "./registerModal";
import Workers from "../../../component/page/worker/workers";
import Search from "../../../component/search";
import Button from "../../../component/button/button";

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
