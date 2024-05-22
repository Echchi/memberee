"use client";
import React, { useEffect, useState } from "react";
import { addMonths, format, getMonth, getYear } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MonthChanger = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const { replace } = useRouter();
  const today = new Date();
  const [date, setDate] = useState(today);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const year = getYear(date) + "";
    const month = getMonth(date) + 1 + "";
    params.set("year", year);
    params.set("month", month);
    replace(`${pathname}?${params.toString()}`);
  }, [date, searchParams]);

  return (
    <div className="flex justify-center items-center font-semibold text-2xl mt-3">
      <button onClick={() => setDate(addMonths(date, -1))}>
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
      <span className="lg:px-6 px-4">{format(date, "yyyy년 MM월")}</span>
      <button onClick={() => setDate(addMonths(date, 1))}>
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
