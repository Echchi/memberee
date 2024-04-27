import React, { useEffect, useState } from "react";
import { DAYOFWEEK, TIME_REGEX, TIME_REGEX_ERROR } from "@/libs/constants";

export interface ITime {
  [key: number]: { startTime: string; endTime: string };
}

const SelectTime = ({
  selectedDay,
  handleTimeChange,
  timeError,
  setTimeError,
  selectedTime,
}: {
  selectedDay: number[];
  handleTimeChange: (
    day: number,
    type: "startTime" | "endTime",
    value: string,
  ) => void;
  timeError: string;
  setTimeError?: React.Dispatch<React.SetStateAction<string>>;
  selectedTime?: ITime;
}) => {
  const [times, setTimes] = useState<ITime>(selectedTime || {});

  const RUNTIME = 20;
  useEffect(() => {
    setTimes((prevTimes) => {
      const filteredTimes: ITime = {};
      selectedDay.forEach((day) => {
        if (prevTimes[day]) {
          filteredTimes[day] = prevTimes[day];
        }
      });
      return filteredTimes;
    });
  }, [selectedDay]);

  useEffect(() => {
    let formatErrorDays = [];
    let orderErrorDays = [];

    for (const [day, { startTime, endTime }] of Object.entries(times)) {
      const invalidFormat =
        !startTime ||
        !endTime ||
        !TIME_REGEX.test(startTime) ||
        !TIME_REGEX.test(endTime);
      const invalidOrder = !isTimeBefore(startTime, endTime);

      if (invalidFormat) {
        formatErrorDays.push(`${DAYOFWEEK[Number(day)]}요일`);
      }
      if (invalidOrder) {
        orderErrorDays.push(`${DAYOFWEEK[Number(day)]}요일`);
      }
    }

    let errorMessage = "";
    if (formatErrorDays.length > 0) {
      errorMessage = `${formatErrorDays.join(", ")}의 시간 형식이 올바르지 않습니다`;
    } else if (orderErrorDays.length > 0) {
      if (errorMessage) errorMessage += " ";
      errorMessage = `${orderErrorDays.join(", ")}의 종료 시간은 시작 시간 이후여야 합니다`;
    }

    setTimeError && setTimeError(errorMessage || "");
  }, [times]);

  const handleStartTimeChange = (day: number, time: string) => {
    handleTimeChange(day, "startTime", time);
    const newStartTime = time;
    const endTime = calculateEndTime(newStartTime) || "";
    setTimes((prevTimes) => ({
      ...prevTimes,
      [day]: { ...prevTimes[day], startTime: newStartTime, endTime: endTime },
    }));

    handleTimeChange(day, "endTime", endTime);
  };

  const handleEndTimeChange = (day: number, time: string) => {
    const startTime = times[day]?.startTime || "00:00";
    if (isTimeBefore(time, startTime)) {
      setTimeError && setTimeError("종료 시간은 시작 시간 이후여야 합니다");
    }

    setTimes((prevTimes) => ({
      ...prevTimes,
      [day]: { ...prevTimes[day], endTime: time },
    }));

    handleTimeChange(day, "endTime", time);
  };

  const calculateEndTime = (startTime: string) => {
    // 시간 형식 검증 로직 추가
    if (!/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(startTime)) {
      return ""; // 유효하지 않은 형식일 때 빈 문자열 반환
    }

    const timeParts = startTime.split(":");
    const date = new Date();
    date.setHours(
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10) + RUNTIME,
    );
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const isTimeBefore = (endTime: string, startTime: string) => {
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    return (
      new Date(0, 0, 0, endHour, endMinute) <=
      new Date(0, 0, 0, startHour, startMinute)
    );
  };

  return (
    <>
      <div className="bg-white py-3 col-span-2 border border-t-0 border-b-1 border-neutral-300 flex flex-col lg:pl-10 pl-4">
        <div className="flex">
          <div className="hidden lg:flex items-center lg:text-lg flex-nowrap w-24 font-semibold text-stone-600 ">
            시간 선택
          </div>
          <div className="flex justify-center *: text-center w-full space-y-3 *:lg:text-lg *:font-medium *:text-stone-600 overflow-y-auto h-36">
            <div className="w-2/3 grid grid-cols-3 place-items-center gap-3">
              <div className="!font-semibold">요일</div>
              <div className="!font-semibold">시작 시간</div>
              <div className="!font-semiboldl">종료 시간</div>
              {selectedDay.sort().map((day, index) => (
                <React.Fragment key={`select_time_${index}`}>
                  <div className="self-center">{DAYOFWEEK[day]}요일</div>

                  <input
                    className="rounded-lg bg-stone-100 outline-none text-xs xl:text-lg font-medium text-center w-full py-2 px-3"
                    type="text"
                    placeholder={"10:00"}
                    required={true}
                    maxLength={5}
                    defaultValue={times[day]?.startTime || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleStartTimeChange(day, e.target.value)
                    }
                  />

                  <input
                    className="rounded-lg bg-stone-100 outline-none text-xs xl:text-lg font-medium text-center w-full py-2 px-3"
                    type="text"
                    placeholder={"10:20"}
                    required={true}
                    maxLength={5}
                    defaultValue={times[day]?.endTime || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEndTimeChange(day, e.target.value)
                    }
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {timeError && (
          <div className="col-span-3 text-orange-500 text-xs lg:text-sm w-full text-right lg:pr-10 pt-3">
            {timeError}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectTime;
