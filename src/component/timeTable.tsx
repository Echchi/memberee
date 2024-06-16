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
import { classWithMember } from "@/component/page/main/class/class";

function TimeTable({ classes }: { classes: classWithMember[] }) {
  const router = useRouter();
  const [scheduleByWorker, setScheduleByWorker] = useState<{
    [key: string]: { schedules: any[]; name: string };
  }>({});
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [classes]);

  return (
    <div
      className={cls(
        `relative mt-3 !grid justify-items-center *:text-lg *:font-semibold gap-3  min-w-fit`,
        loading ? "!overflow-hidden" : "overflow-auto",
      )}
      style={{
        gridTemplateColumns: loading
          ? "80px repeat(5, minmax(120px, 1fr))"
          : `80px repeat(${Object.keys(scheduleByWorker).length}, minmax(120px, 1fr))`,
      }}
    >
      {!loading ? (
        <>
          <div className="py-3 bg-white flex justify-center"></div>
          {Object.entries(scheduleByWorker).map(([id, worker]) => (
            <div
              key={`main_class_worker_${id}`}
              className="py-3 bg-white w-full flex justify-center font-semibold text-sm xl:text-base sticky top-0"
            >
              {worker.name}
            </div>
          ))}

          {Array.from({ length: 18 }).map((_, hourIndex) => (
            <React.Fragment key={`main_hour_fragment_${hourIndex}`}>
              <div
                className="text-sm xl:text-base font-semibold sticky left-0"
                key={`main_hour_${hourIndex}`}
              >{`${6 + hourIndex}시`}</div>
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
                          className={`font-medium xl:block xl:text-sm text-xs hidden`}
                        >
                          {c.startTime} ~ {c.endTime}
                        </p>
                        <p className="font-bold text-center text-sm ">
                          {c.memberNames}
                        </p>
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          {[...Array(35)].map((_, index) => (
            <div
              key={`main_class_loading_${index}`}
              className="skeleton w-32 rounded-lg min-h-20"
            />
          ))}
        </>
      )}
    </div>
  );
}

export default TimeTable;
