import React, { useEffect, useState } from "react";
import {
  calculateGridRowEnd,
  calculateGridRowStart,
  cls,
} from "@/libs/client/utils";
import { format } from "date-fns";
import { Schedule } from "@prisma/client";
import { useRouter } from "next/navigation";
import Classes from "@/component/page/class/classes";
import { classWithMember } from "@/component/page/main/class";

function TimeTable({ classes }: { classes: classWithMember[] }) {
  const router = useRouter();
  const [scheduleByWorker, setScheduleByWorker] = useState<{
    [key: string]: { schedules: any[]; name: string };
  }>({});

  useEffect(() => {
    const newScheduleByWorker: {
      [key: string]: { schedules: any[]; name: string };
    } = {};
    classes.forEach((c) => {
      const workerId = c.workerId.toString(); // workerId를 문자열로 처리
      const workerName = c.worker.name; // 직원 이름 추가
      const startTime = format(c.startTime, "HH:mm");
      const endTime = format(c.endTime, "HH:mm");
      const gridRowStart = calculateGridRowStart(startTime, endTime);
      const gridRowEnd = calculateGridRowEnd(startTime, endTime);

      if (!newScheduleByWorker[workerId]) {
        newScheduleByWorker[workerId] = { schedules: [], name: workerName };
      }

      let existingSchedule = newScheduleByWorker[workerId].schedules.find(
        (s: any) => s.startTime === startTime && s.endTime === endTime,
      );
      if (existingSchedule) {
        existingSchedule.memberNames += `, ${c.member.name}`;
      } else {
        newScheduleByWorker[workerId].schedules.push({
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

    Object.values(newScheduleByWorker).forEach((worker) => {
      worker.schedules.sort((a: any, b: any) =>
        a.startTime.localeCompare(b.startTime),
      );
    });

    setScheduleByWorker(newScheduleByWorker);
  }, [classes]);
  useEffect(() => {
    console.log("scheduleByWorker", scheduleByWorker);
  }, [scheduleByWorker]);

  return (
    <div
      className="relative mt-3 !grid justify-items-center *:text-lg *:font-semibold gap-3 overflow-auto min-w-fit"
      style={{
        gridTemplateColumns: `80px repeat(${Object.keys(scheduleByWorker).length}, minmax(120px, 1fr))`,
      }}
    >
      <div className="py-3 bg-white flex justify-center"></div>
      {Object.entries(scheduleByWorker).map(([id, worker]) => (
        <div
          key={`main_class_worker_${id}`}
          className="py-3 bg-white w-full flex justify-center"
        >
          {worker.name}
        </div>
      ))}

      {Array.from({ length: 18 }).map((_, hourIndex) => (
        <>
          <div key={`main_hour_${hourIndex}`}>{`${6 + hourIndex}시`}</div>
          {Object.values(scheduleByWorker).map((worker, index) => (
            <div
              key={`main_schedule_${index}`}
              className="grid w-full gap-y-2 pb-4 grid-rows-6 rounded-lg bg-stone-50"
            >
              {worker.schedules.map((c: any, index: number) => {
                return 6 + hourIndex === Number(c.startTime.slice(0, 2)) ? (
                  <div
                    onClick={() => router.push(`/member/${c.memberId}`)}
                    key={`schedule_${index}`}
                    className="font-medium bg-amber-200 w-full rounded-xl p-2 text-xs shadow hover:z-10 transition-all cursor-pointer min-h-12"
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
    </div>
  );
}

export default TimeTable;
