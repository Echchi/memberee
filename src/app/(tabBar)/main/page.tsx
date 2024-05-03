import { format, getMonth, getYear } from "date-fns";
import React from "react";
import TimeTable from "@/component/timeTable";
import { cls } from "@/libs/client/utils";
import { useRouter } from "next/navigation";
import Tag from "@/component/tag";
import Class from "@/component/page/main/class";
import Alarm from "@/component/page/main/alarm";
import Worker from "@/component/page/main/worker";
import Pay from "@/component/page/main/pay";
import { getMembers } from "@/component/page/member/members";
import { getPaidCnt } from "@/app/(tabBar)/main/api";
import { getWorkers } from "@/component/page/worker/workers";
import { getClasses } from "@/app/(tabBar)/class/api";
import { getDay } from "date-fns";

const Page = async () => {
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;
  const dayOfWeek = getDay(new Date()) === 0 ? 7 : getDay(new Date());

  const paidCnt = await getPaidCnt(year, month);
  const totalMemCnt = await getMembers("", year, month);
  const workers = await getWorkers("");
  const members = await getMembers("", year, month);
  const classes = await getClasses({ year, month, dayOfWeek });
  return (
    <>
      {totalMemCnt.length - paidCnt > 0 && (
        <Alarm overdueCnt={totalMemCnt.length - paidCnt} />
      )}
      <div className="md:grid grid-cols-2 grid-rows-3 gap-3 mt-4 lg:mt-12 h-[700px]">
        <Class classes={classes} />
        <Worker workers={workers} />
        <Pay members={members} />
      </div>
    </>
  );
};

export default Page;
