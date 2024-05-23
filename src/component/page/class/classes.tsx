import React, { useEffect, useState } from "react";
import { IWorkerWithMemos } from "@/app/(tabBar)/worker/[id]/page";
import { Schedule } from "@prisma/client";
import { DAYOFWEEK } from "@/libs/constants";
import {
  differenceInMinutes,
  format,
  getHours,
  getTime,
  parse,
  parseISO,
} from "date-fns";
import { useRouter } from "next/navigation";
import {
  calculateGridRowEnd,
  calculateGridRowStart,
} from "@/libs/client/utils";

const Classes = ({ classes }: { classes: Schedule[] }) => {
  console.log("classes worker", classes);
  const router = useRouter();

  const [scheduleByDay, setScheduleByDay] = useState(
    Array.from({ length: 7 }, () => []),
  );

  useEffect(() => {
    const newScheduleByDay: any[] = Array.from({ length: 7 }, () => []);

    classes.forEach((c: any) => {
      const dayOfWeek = c.dayOfWeek - 1;
      const startTime = format(c.startTime, "HH:mm");
      const endTime = format(c.endTime, "HH:mm");
      const gridRowStart = calculateGridRowStart(startTime, endTime);
      const gridRowEnd = calculateGridRowEnd(startTime, endTime);

      let existingSchedule = newScheduleByDay[dayOfWeek].find(
        (s: any) => s.startTime === startTime && s.endTime === endTime,
      );
      if (existingSchedule) {
        existingSchedule.memberNames += `, ${c.member.name}`;
      } else {
        newScheduleByDay[dayOfWeek].push({
          ...c,
          memberNames: c.member.name,
          startTime,
          endTime,
          gridRowStart,
          gridRowEnd,
          memberId: c.memberId,
        });
      }
    });

    newScheduleByDay.forEach((daySchedules) => {
      daySchedules.sort((a: any, b: any) =>
        a.startTime.localeCompare(b.startTime),
      );
    });

    setScheduleByDay(newScheduleByDay);
  }, [classes]);

  return (
    <>
      {Array.from({ length: 18 }).map((_, hourIndex) => (
        <>
          <div key={`hour_${hourIndex}`}>{`${6 + hourIndex}시`}</div>
          {scheduleByDay.map((sch, index) => (
            <div
              key={`schedule_${index}`}
              className="grid w-full gap-y-2 pb-4 grid-rows-6 rounded-lg bg-stone-50 *:min-h-14 max-h-[200px]"
            >
              {sch.map((c: any, index) => {
                return 6 + hourIndex === Number(c.startTime.slice(0, 2)) ? (
                  <div
                    onClick={() => router.push(`/member/${c.memberId}`)}
                    key={`schedule_${index}`}
                    className="overflow-y-auto font-medium bg-amber-200 w-full rounded-xl p-2 text-xs shadow hover:scale-125 hover:z-30 transition-all cursor-pointer z-20"
                    style={{
                      gridRowStart: c.gridRowStart,
                      gridRowEnd: `span ${Number(c.gridRowEnd)}`,
                    }}
                  >
                    <p
                      className={`font-medium lg:block lg:text-sm text-xs hidden`}
                    >
                      {c.startTime} ~ {c.endTime}
                    </p>
                    <p className="font-bold text-center text-sm">
                      {c.memberNames}
                    </p>
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          ))}
        </>
      ))}
    </>
  );
};

export default Classes;
