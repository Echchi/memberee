import React from "react";
import Input from "@/component/input";
import Button from "@/component/button/button";
import Modal from "@/component/modal";
import Register from "./register/page";
import { useRouter } from "next/navigation";
import RegisterModal from "@/app/(tabBar)/worker/registerModal";
import db from "@/libs/server/db";
import Link from "next/link";
import { DayOfWeek } from "@/component/dayOfWeek";
import { useForm } from "react-hook-form";
import Worker from "@/component/worker/worker";

async function getWorkers(formData?: FormData) {
  "use server";
  const searchWordValue = formData?.get("searchWord");
  const searchWord = typeof searchWordValue === "string" ? searchWordValue : "";
  console.log("searchWord", searchWord);
  const workers = await db.worker.findMany({
    where: {
      status: 1,
      ...(searchWord && {
        name: {
          contains: searchWord,
        },
      }),
    },
    select: {
      id: true,
      name: true,
      dayOfWeek: true,
      phone: true,
    },
  });
  return workers;
}

const Page = async () => {
  const workers = await getWorkers();

  return (
    <>
      <div className="my-3 flex justify-between items-center lg:space-x-0 space-x-4">
        <form action={getWorkers} className="w-full">
          <Input
            type="text"
            name={"searchWord"}
            placeholder="이름"
            icon={
              <span className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            }
            className="rounded-xl border-0 h-12 bg-stone-100 w-full lg:w-1/2"
          />
        </form>
        <div className="flex space-x-3 w-1/12">
          <RegisterModal />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-3 *:cursor-pointer *:transition-all ">
        {workers && <Worker workers={workers} />}
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
