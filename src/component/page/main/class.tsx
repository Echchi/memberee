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
  console.log("classes", classes);
  const today = dateFormattedtoKor(new Date());
  const dayOfWeek = getDay(new Date()) === 0 ? 7 : getDay(new Date());
  const router = useRouter();

  return (
    <>
      <div
        className={cls(
          "relative box flex-col row-span-3 hover:shadow-lg transition-all h-1/2 md:h-full",
          classes.length > 0 ? "cursor-pointer" : "cursor-default",
        )}
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
          <div className="grow flex flex-col justify-center items-center space-y-3 overflow-y-auto overflow-x-auto mt-3 font-semibold text-xl text-stone-400">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
              </svg>
            </div>
            <p>등록된 수업이 없습니다</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Class;
