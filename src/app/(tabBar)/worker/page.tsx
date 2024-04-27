import React from "react";
import Input from "@/component/input";
import RegisterModal from "@/app/(tabBar)/worker/registerModal";
import Workers from "@/component/page/worker/workers";
import Search from "@/component/search";
import Button from "@/component/button/button";

const Page = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const query = searchParams?.query || "";

  return (
    <>
      <div className="my-3 flex justify-between items-center lg:space-x-0 space-x-4">
        <Search placeholder={"이름"} />

        <RegisterModal />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-3 *:cursor-pointer *:transition-all ">
        <Workers query={query} />
        {/*{workers &&*/}
        {/*  workers.map((worker, index) => (*/}
        {/*    <Link*/}
        {/*      href={`/worker/${worker.id}`}*/}
        {/*      key={worker.id}*/}
        {/*      className="bg-white w-full min-h-fit shadow rounded-lg flex flex-col items-center p-4 hover:shadow-lg"*/}
        {/*    >*/}
        {/*      <div className="bg-stone-200 rounded-full h-32 w-32" />*/}
        {/*      <div className="mt-4 flex flex-col items-center space-y-1">*/}
        {/*        <p className="font-bold text-lg tracking-wider">*/}
        {/*          {worker.name}*/}
        {/*        </p>*/}
        {/*        <p className="space-x-2">{DayOfWeek(worker.dayOfWeek || "")}</p>*/}
        {/*        <p>{worker.phone}</p>*/}
        {/*      </div>*/}
        {/*    </Link>*/}
        {/*  ))}*/}
      </div>
    </>
  );
};

export default Page;
