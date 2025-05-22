import React from "react";
import { DAYOFWEEK } from "../../../libs/constants";
import { cls } from "../../../libs/client/utils";

interface IWorkingDayProps {
  selectedDay: number[];
  handleSelectDay: (event: React.MouseEvent, index: number) => void;
}

const SelectWorkingDay = (props: IWorkingDayProps) => {
  const { selectedDay, handleSelectDay } = props;
  return (
    <div className="bg-white py-3 col-span-2 border border-t-1 border-b-0 border-neutral-300 flex flex-col justify-center xl:pl-10 pl-4">
      <div className="flex 16">
        <span className="hidden xl:flex items-center text-sm xl:text-lg flex-nowrap w-24 font-semibold text-stone-600">
          근무일
        </span>

        <div className="grid grid-cols-7 justify-items-center py-3 w-full px-4 gap-x-2">
          {Object.entries(DAYOFWEEK).map(([index, day]) => (
            <div
              key={day}
              className="relative flex flex-col justify-center items-center text-sm xl:text-lg *:py-2 *:px-3 xl:*:px-4 *:trnsition-all py-4 xl:py-0"
            >
              <button
                className={cls(
                  "rounded-full text-stone-600",
                  selectedDay.includes(+index)
                    ? "ring-2 ring-inset ring-emerald-600 font-bold"
                    : "bg-transparent font-medium",
                )}
                type={"button"}
                onClick={(event: React.MouseEvent) =>
                  handleSelectDay(event, +index)
                }
              >
                {day}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectWorkingDay;
