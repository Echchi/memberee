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

const Classes = ({
  classes,
  loading,
}: {
  classes: Schedule[];
  loading: boolean;
}) => {
  // console.log("classes worker", classes);
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
          <div key={`hour_${hourIndex}`} className="flex lg:text-base text-xs">
            {`${6 + hourIndex} `}
            <span className="hidden lg:block">시</span>
          </div>
          {!loading
            ? scheduleByDay.map((sch, index) => (
                <div
                  key={`schedule_${index}`}
                  className="grid w-full gap-y-2 pb-4 grid-rows-6 rounded-lg bg-stone-50 *:min-h-16 max-h-[200px]"
                >
                  {sch.map((c: any, index) => {
                    return 6 + hourIndex === Number(c.startTime.slice(0, 2)) ? (
                      <div
                        onClick={() => router.push(`/member/${c.memberId}`)}
                        key={`schedule_${index}`}
                        className="overflow-y-auto font-medium bg-amber-200 w-full rounded-xl p-2 text-xs shadow hover:scale-125 hover:z-30 transition-all cursor-pointer z-20 flex justify-center items-center lg:block"
                        style={{
                          gridRowStart: c.gridRowStart,
                          gridRowEnd: `span ${Number(c.gridRowEnd)}`,
                        }}
                      >
                        <p
                          className={`font-medium lg:block lg:text-sm text-xs hidden print:block`}
                        >
                          {c.startTime} ~ {c.endTime}
                        </p>
                        <p className="font-bold text-center text-xs lg:text-sm">
                          {c.memberNames}
                        </p>
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              ))
            : [...Array(7)].map((_, index) => (
                <div
                  key={`class_loading_${index}`}
                  className="skeleton min-h-16 gap-y-2 w-full rounded-lg"
                />
              ))}
        </>
      ))}
    </>
  );
};

export default Classes;
