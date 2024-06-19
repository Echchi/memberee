import { getMonth, getYear } from "date-fns";

import Class from "@/component/page/main/class/class";
import Alarm from "@/component/page/main/alarm";
import Worker from "@/component/page/main/worker";
import Member from "@/component/page/main/member/member";

import { getPaidCnt, getTotalCnt } from "@/app/(tabBar)/main/api";
import { getWorkers } from "@/component/page/worker/workers";
import { getClasses } from "@/app/(tabBar)/class/api";
import { getDay } from "date-fns";

const Page = async () => {
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;
  const dayOfWeek = getDay(new Date()) === 0 ? 7 : getDay(new Date());

  console.time("main getPaidCnt");
  const paidCnt = await getPaidCnt(year, month);
  console.timeEnd("main getPaidCnt");
  console.time("main getTotalCnt");
  const totalMemCnt = await getTotalCnt(year, month);
  console.timeEnd("main getTotalCnt");

  console.time("main getWorkers,getClasses");
  const [workers, classes] = await Promise.all([
    getWorkers(""),
    getClasses({ year, month, dayOfWeek }),
  ]);
  console.timeEnd("main getWorkers,getClasses");

  return (
    <>
      {totalMemCnt - paidCnt > 0 && (
        <Alarm overdueCnt={totalMemCnt - paidCnt} />
      )}
      <div className="xl:grid grid-cols-2 grid-rows-3 gap-3 mt-4 xl:mt-5 xl:h-[700px]">
        <Class classes={classes} />

        <Worker workers={workers} />
        <Member
          registerOpen={Boolean(workers.length)}
          year={year}
          month={month}
        />
      </div>
    </>
  );
};

export default Page;
