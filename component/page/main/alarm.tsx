"use client";
import React, { useState } from "react";
import { cls, dateFormattedtoKor } from "../../../libs/client/utils";
import { useRouter } from "next/navigation";
import { getMonth } from "date-fns";

const Alarm = ({
  month,
  overdueCnt,
}: {
  month: number;
  overdueCnt: number;
}) => {
  const router = useRouter();
  const today = dateFormattedtoKor(new Date());
  const [alarmHide, setAlramHide] = useState(false);
  const handleHideBtn = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAlramHide(true);
  };
  return (
    <p
      data-testid="main-alert"
      onClick={() => router.push("/pay")}
      className={cls(
        "cursor-pointer flex items-center justify-between py-2 xl:py-3 w-full bg-gradient-to-r from-orange-200 from-5% to-orange-300 rounded-lg px-5 xl:px-8 mt-3 font-semibold text-orange-600 animate-pulse transition-all",
        alarmHide ? "hidden" : "",
      )}
    >
      <span className="text-xs xl:text-base">
        {`${month}월 납부 내역이 확인되지 않은 회원이 ${overdueCnt}명 있어요`}
      </span>
      <button
        className="rounded-full"
        onClick={(event) => handleHideBtn(event)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </p>
  );
};

export default Alarm;
