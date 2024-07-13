import { getMonth, getYear } from "date-fns";

import Class from "../../../component/page/main/class/class";
import Alarm from "../../../component/page/main/alarm";
import Worker from "../../../component/page/main/worker";
import Member from "../../../component/page/main/member/member";

import { getPaidCnt, getTotalCnt } from "./api";
import { getWorkers } from "../../../component/page/worker/workers";
import { getClasses } from "../class/api";
import { getDay } from "date-fns";
import getSession from "../../../libs/client/session";

const Page = async () => {
  const session = await getSession();
  const payDay = session.payday;
  const year = getYear(new Date());
  const isAfterPayDay = getDay(new Date()) >= payDay!!;
  const month = isAfterPayDay ? getMonth(new Date()) + 1 : getMonth(new Date());
  const dayOfWeek = getDay(new Date()) === 0 ? 7 : getDay(new Date());

  const paidCnt = await getPaidCnt(year, month);

  const totalMemCnt = await getTotalCnt(year, month);

  const [workers, classes] = await Promise.all([
    getWorkers(""),
    getClasses({ year, month, dayOfWeek }),
  ]);

  return (
    <>
      {totalMemCnt - paidCnt > 0 && (
        <Alarm overdueCnt={totalMemCnt - paidCnt} month={month} />
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
