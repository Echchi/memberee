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

const Page = async () => {
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;
  const paidCnt = await getPaidCnt(year, month);

  const totalMemCnt = await getMembers("", year, month);
  const workers = await getWorkers("");
  const members = await getMembers("", year, month);

  return (
    <>
      <Alarm overdueCnt={totalMemCnt.length - paidCnt} />
      <div className="md:grid grid-cols-2 grid-rows-3 gap-3 mt-4 lg:mt-12 h-[700px]">
        <Class />
        <Worker workers={workers} />
        <Pay members={members} />
      </div>
    </>
  );
};

export default Page;
