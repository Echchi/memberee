"use client";
import React, { useEffect, useState } from "react";
import TimeTable from "@/component/timeTable";
import { useRouter } from "next/navigation";
import {
  calculateGridRowEnd,
  calculateGridRowStart,
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
    <div
      className="box flex-col row-span-3 hover:shadow-lg cursor-pointer transition-all h-1/2 md:h-full"
      onClick={() => router.push("/class")}
      data-testid="class-mainbox"
    >
      <span className="box_title">
        {today} {DAYOFWEEK[dayOfWeek]}요일 수업
      </span>
      <div className="overflow-y-auto overflow-x-auto mt-3">
        <TimeTable classes={classes} />
      </div>
    </div>
  );
};

export default Class;
