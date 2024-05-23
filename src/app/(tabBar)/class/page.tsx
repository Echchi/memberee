"use client";
import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import MonthChanger from "@/component/monthChanger";
import Input from "@/component/input";
import Button from "@/component/button/button";
import WorkerList from "@/component/page/member/register/workerList";
import Classes from "@/component/page/class/classes";

import { getClasses } from "@/app/(tabBar)/class/api";
import { Member, Schedule } from "@prisma/client";
import { getMonth, getYear } from "date-fns";
import DownloadClassBtn from "@/component/page/class/excelDownload/downloadClassBtn";

const Page = ({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string; month?: string };
}) => {
  const year = Number(searchParams?.year) || getYear(new Date());
  const month = Number(searchParams?.month) || getMonth(new Date());
  const [initValue, setInitValue] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [classes, setClasses] = useState<Schedule[]>([]);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const classes = event?.target?.value;
    setSelectedWorker(classes);
  };

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        if (selectedWorker) {
          const response = await getClasses({
            id: +selectedWorker,
            year,
            month,
          });
          response && setClasses(response);
        }
      } catch (error) {
        return new Error("error fetch classes");
      }
    };

    fetchWorker();
  }, [selectedWorker, year, month]);

  useEffect(() => {
    setSelectedWorker(initValue);
  }, [initValue]);

  return (
    <>
      <MonthChanger />
      <div className="my-3 flex justify-between">
        <WorkerList
          isOnly={true}
          onChange={onChange}
          setInitValue={setInitValue}
        />

        <div className="hidden lg:block w-1/12">
          {/*<Button text={"출력"} className="py-3" />*/}
          <DownloadClassBtn
            classes={classes}
            sub={`${year}년 ${month}월`}
            worker={selectedWorker}
          />
        </div>
      </div>
      <div className="box mt-3 !pt-0 grid grid-cols-8 justify-items-center *:text-lg *:font-semibold gap-3 overflow-y-auto h-[70vh]">
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center"></div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          월
        </div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          화
        </div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          수
        </div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          목
        </div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          금
        </div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          토
        </div>
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          일
        </div>
        {classes && <Classes classes={classes} />}
      </div>
    </>
  );
};

export default Page;
