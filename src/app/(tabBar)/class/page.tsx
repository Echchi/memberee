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
  const [loading, setLoading] = useState(true);
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
          if (response) {
            setClasses(response);
            setLoading(false);
          }
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
      <div className="my-3 flex justify-between items-center">
        <WorkerList
          isOnly={true}
          onChange={onChange}
          setInitValue={setInitValue}
        />

        <div className="hidden xl:block w-1/12">
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
        className="box !pt-0 !px-1 relative bg-white mt-3 grid grid-cols-[_0.5fr,_1fr,_1fr,_1fr,_1fr,_1fr,_1fr,_1fr] justify-items-center *:text-base *:xl:text-lg *:font-semibold gap-1 xl:gap-3 overflow-y-auto h-[70vh] print:h-fit print:overflow-visible"
      >
        <div></div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          월
        </div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          화
        </div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          수
        </div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          목
        </div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          금
        </div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          토
        </div>
        <div className="w-full bg-white sticky top-0 h-14 xl:h-20 flex items-center justify-center z-50 font-semibold">
          일
        </div>

        {<Classes classes={classes} loading={loading} />}
      </div>
    </>
  );
};

export default Page;
