import { format, getMonth, getYear } from "date-fns";
import React from "react";
import TimeTable from "@/component/timeTable";
import { cls } from "@/libs/client/utils";
import { useRouter } from "next/navigation";
import Tag from "@/component/tag";
import Class from "@/component/page/main/class";
import Alarm from "@/component/page/main/alarm";
import Worker from "@/component/page/main/worker";
import Member from "@/component/page/main/member";

import { getPaidCnt, getTotalCnt } from "@/app/(tabBar)/main/api";
import { getWorkers } from "@/component/page/worker/workers";
import { getClasses } from "@/app/(tabBar)/class/api";
import { getDay } from "date-fns";
import { getMembers } from "@/app/(tabBar)/member/api";

const Page = async () => {
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;
  const dayOfWeek = getDay(new Date()) === 0 ? 7 : getDay(new Date());

  const paidCnt = await getPaidCnt(year, month);
  const totalMemCnt = await getTotalCnt(year, month);
  const workers = await getWorkers("");
  const membersWithTotal = await getMembers({
    params: { query: "", year, month },
  });
  const classes = await getClasses({ year, month, dayOfWeek });

  return (
    <>
      {totalMemCnt - paidCnt > 0 && (
        <Alarm overdueCnt={totalMemCnt - paidCnt} />
      )}
      <div className="md:grid grid-cols-2 grid-rows-3 gap-3 mt-4 lg:mt-12 h-[700px]">
        <Class classes={classes} />
        <Worker workers={workers} />
        <Member
          members={membersWithTotal.members}
          registerOpen={Boolean(workers.length)}
        />
      </div>
    </>
  );
};

export default Page;
