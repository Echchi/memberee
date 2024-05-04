"use client";
import React, { useEffect, useState } from "react";
import TimeTable from "@/component/timeTable";
import { useRouter } from "next/navigation";
import {
  calculateGridRowEnd,
  calculateGridRowStart,
  cls,
  dateFormattedtoKor,
} from "@/libs/client/utils";
import { Member, Schedule, Worker } from "@prisma/client";
import { getDay } from "date-fns";
import { DAYOFWEEK } from "@/libs/constants";

export interface classWithMember extends Schedule {
  member: Member;
  worker: Worker;
}

const Class = ({ classes }: { classes: classWithMember[] }) => {
  const today = dateFormattedtoKor(new Date());
  const dayOfWeek = getDay(new Date()) === 0 ? 7 : getDay(new Date());
  const router = useRouter();

  return (
    <>
      <div
        className="box flex-col row-span-3 hover:shadow-lg transition-all h-1/2 md:h-full cursor-pointer"
        onClick={() => (classes.length > 0 ? router.push("/class") : undefined)}
        data-testid="class-mainbox"
      >
        <span className="box_title">
          {today} {DAYOFWEEK[dayOfWeek]}요일 수업
        </span>
        {classes.length > 0 ? (
          <div className="overflow-y-auto overflow-x-auto mt-3">
            <TimeTable classes={classes} />
          </div>
        ) : (
          <div className="grow flex flex-col justify-center items-center space-y-3 overflow-y-auto overflow-x-auto mt-3 font-semibold text-xl text-stone-400 hover:text-stone-500 transition-all">
            <p>등록된 수업이 없습니다</p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Class;
