import React, { useState } from "react";
import { addMonths, format } from "date-fns";

const MonthChanger = ({
  month,
  setMonth,
}: {
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  return (
    <div className="flex justify-center items-center font-semibold text-2xl mt-3">
      <button onClick={() => setMonth(addMonths(month, -1))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <span className="lg:px-6 px-4">{format(month, "yyyy년 MM월")}</span>
      <button onClick={() => setMonth(addMonths(month, 1))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default MonthChanger;
