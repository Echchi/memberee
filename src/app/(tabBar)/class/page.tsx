"use client";
import React, { useState } from "react";
import { Reorder } from "framer-motion";
import MonthChanger from "@/component/monthChanger";
import Input from "@/component/input";
import Button from "@/component/button/button";

const Page = () => {
  const today = new Date();
  const [month, setMonth] = useState(today);
  const [items, setItems] = useState([0, 1, 2, 3]);
  return (
    <>
      <MonthChanger month={month} setMonth={setMonth} />
      <div className="my-3 flex justify-between">
        <select className="rounded-xl border-0 h-12 px-6 bg-stone-100 w-full lg:w-fit outline-none">
          <option>이코치</option>
          <option>함코치</option>
          <option>장코치</option>
        </select>
        <div className="hidden lg:block w-1/12">
          <Button text={"출력"} className="py-3" />
        </div>
      </div>
      <div className="box mt-3 !pt-0 grid grid-cols-8 justify-items-center *:text-lg *:font-semibold gap-3 overflow-y-auto h-[70vh]">
        <div className="sticky top-0 py-3 bg-white w-full flex justify-center">
          시간
        </div>
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
        {Array.from({ length: 18 }).map((_, hourIndex) => (
          <>
            <div>{`${6 + hourIndex}시`}</div>
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="grid grid-rows-3 w-full gap-y-2 pb-4"
              >
                <div
                  key={dayIndex}
                  className="font-medium bg-orange-200 w-full rounded-xl p-2 text-xs min-h-14"
                >
                  <p className="font-medium lg:block lg:text-sm text-xs hidden">
                    {hourIndex + 6}:00 ~ {hourIndex + 6}:20
                  </p>
                  <p className="font-bold text-center">홍길동</p>
                </div>{" "}
                <div
                  key={dayIndex}
                  className="font-medium bg-orange-200 w-full rounded-xl p-2 text-xs min-h-14"
                >
                  <p className="font-medium lg:block lg:text-sm text-xs hidden">
                    {hourIndex + 6}:20 ~ {hourIndex + 6}:40
                  </p>
                  <p className="font-bold text-center">홍길동</p>
                </div>{" "}
                <div
                  key={dayIndex}
                  className="font-medium  bg-orange-200 w-full rounded-xl p-2 text-xs min-h-14"
                >
                  <p className="font-medium lg:block lg:text-sm text-xs hidden">
                    {hourIndex + 6}:40 ~ {hourIndex + 6}:60
                  </p>
                  <p className="font-bold text-center">홍길동</p>
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
    </>
  );
};

export default Page;
