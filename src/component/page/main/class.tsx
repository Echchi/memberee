"use client";
import React from "react";
import TimeTable from "@/component/timeTable";
import { useRouter } from "next/navigation";
import { dateFormattedtoKor } from "@/libs/client/utils";

const Class = () => {
  const today = dateFormattedtoKor(new Date());
  const router = useRouter();
  return (
    <div
      className="box flex-col row-span-3 hover:shadow-lg cursor-pointer transition-all h-1/2 md:h-full"
      onClick={() => router.push("/class")}
      data-testid="class-mainbox"
    >
      <span className="box_title">{today} 수업</span>
      <div className="overflow-y-auto overflow-x-auto mt-3">
        <TimeTable />
      </div>
    </div>
  );
};

export default Class;
