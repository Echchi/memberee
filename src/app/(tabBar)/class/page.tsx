"use client";
import React, { useEffect, useRef, useState } from "react";
import { Reorder } from "framer-motion";
import MonthChanger from "@/component/monthChanger";
import Input from "@/component/input";
import Button from "@/component/button/button";
import WorkerList from "@/component/page/member/register/workerList";
import Classes from "@/component/page/class/classes";

import { getClasses } from "@/app/(tabBar)/class/api";
import { Member, Schedule } from "@prisma/client";
import { format, getMonth, getYear } from "date-fns";
import DownloadClassBtn from "@/component/page/class/excelDownload/downloadClassBtn";
import { PrintPdfBtn } from "@/component/pdf/printPdfBtn";

const Page = ({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string; month?: string };
}) => {
  const classRef = useRef<HTMLDivElement | null>(null);
  const year = Number(searchParams?.year) || getYear(new Date());
  const month = Number(searchParams?.month) || getMonth(new Date());
  const [initValue, setInitValue] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedWorkerName, setSelectedWorkerName] = useState("");
  const [classes, setClasses] = useState<Schedule[]>([]);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const workerId = event?.target?.value;
    const selectedOptionIndex = event.target.selectedIndex;
    const selectedOptionText = event.target.options[selectedOptionIndex].text;

    setSelectedWorker(workerId);
    setSelectedWorkerName(selectedOptionText);
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
    setSelectedWorker(initValue.id);
    setSelectedWorkerName(initValue.name);
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
          <PrintPdfBtn
            title={`${selectedWorkerName} ${year}년${month}월 시간표_${format(new Date(), "yyyyMMdd")}`}
            content={classRef}
          />
          {/*<Button text={"출력"} className="py-3" />*/}
          {/*<DownloadClassBtn*/}
          {/*  content={classes}*/}
          {/*  sub={`${year}년 ${month}월`}*/}
          {/*  worker={selectedWorkerName}*/}
          {/*/>*/}
        </div>
      </div>
      <div
        ref={classRef}
        className="box mt-3 !pt-0 grid grid-cols-8 justify-items-center *:text-lg *:font-semibold gap-3 overflow-y-auto h-[70vh] print:h-fit print:overflow-visible"
      >
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
