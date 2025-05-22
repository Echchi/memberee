"use client";
import React, { useState } from "react";
import { cls, dateFormattedtoKor } from "../../../libs/client/utils";
import { useRouter } from "next/navigation";
import { addMonths, differenceInDays, getMonth, setDate } from "date-fns";
import { PaymentType } from "@prisma/client";

const Alarm = ({
  month,
  overdueCnt,
  paymentType,
  payDay,
}: {
  month: number;
  overdueCnt: number;
  paymentType: PaymentType;
  payDay?: number | null;
}) => {
  const router = useRouter();
  const today = new Date();
  // const nextPayDate = setDate(addMonths(today, 1), payDay || 1);
  const nextPayDate = setDate(today, payDay || 1);
  console.log("nextPayDate", nextPayDate);
  const dDay = differenceInDays(nextPayDate, today);
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
        // "cursor-pointer flex items-center justify-between py-2 xl:py-3 w-full bg-gradient-to-r from-orange-200 from-5% to-orange-300 rounded-lg px-5 xl:px-8 mt-3 font-semibold text-orange-700 animate-pulse transition-all",
        "cursor-pointer flex items-center justify-between py-2 xl:py-4 w-full bg-neutral-50 shadow rounded-lg px-5 xl:px-8 mt-3 font-semibold text-neutral-600",
        alarmHide ? "hidden" : "",
      )}
    >
      {paymentType === PaymentType.DIFFERENT ? (
        <>
          <span className="text-base xl:text-xl flex items-center">
            <picture className="mr-3">
              <source
                srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp"
                type="image/webp"
              />
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif"
                alt="🧐"
                className="w-6 h-6 xl:w-8 xl:h-8"
              />
            </picture>
            {`대표님! ${month}월달 수업료 납부가 확인되지 않은 회원이 `}
            <span className="text-lg xl:text-2xl text-orange-600 px-1 xl:px-2">
              {overdueCnt}명
            </span>
            {`있어요`}
          </span>
        </>
      ) : (
        <>
          <span className="text-base xl:text-xl flex items-center">
            {dDay === 0 ? (
              <>
                <picture className="mr-3">
                  <source
                    srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.webp"
                    type="image/webp"
                  />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.gif"
                    alt="💸"
                    className="w-6 h-6 xl:w-8 xl:h-8"
                  />
                </picture>
                <span className="text-green-700">
                  {`대표님! 오늘은 ${month}월달 납부일이에요! `}
                </span>
              </>
            ) : overdueCnt > 0 ? (
              <>
                <picture className="mr-3">
                  <source
                    srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp"
                    type="image/webp"
                  />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif"
                    alt="🧐"
                    className="w-6 h-6 xl:w-8 xl:h-8"
                  />
                </picture>
                {`대표님! ${month}월달 납부가 확인되지 않은 회원이 `}
                <span className="text-lg xl:text-2xl text-orange-600 px-1 xl:px-2">
                  {overdueCnt} 명
                </span>
                {`있어요`}
              </>
            ) : (
              <>
                <picture className="mr-3">
                  <source
                    srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp"
                    type="image/webp"
                  />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif"
                    alt="🥳"
                    className="w-6 h-6 xl:w-8 xl:h-8"
                  />
                </picture>
                {`대표님! ${month}월달 수업료가 모두 납부되었어요!`}
              </>
            )}
          </span>
          <span
            className={cls(
              "hidden xl:flex",
              dDay > 5
                ? ""
                : dDay === 0
                  ? ""
                  : "text-base xl:text-xl text-orange-600",
            )}
          >
            {dDay > 0
              ? `${month}월 납부일까지 ${dDay}일 남았어요`
              : dDay === 0
                ? ``
                : `${month}월 납부일이 ${dDay * -1}일 지났어요`}
          </span>
        </>
      )}
      {/*<button*/}
      {/*  className="rounded-full"*/}
      {/*  onClick={(event) => handleHideBtn(event)}*/}
      {/*>*/}
      {/*  <svg*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*    fill="none"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    strokeWidth={2}*/}
      {/*    stroke="currentColor"*/}
      {/*    className="w-6 h-6"*/}
      {/*  >*/}
      {/*    <path*/}
      {/*      strokeLinecap="round"*/}
      {/*      strokeLinejoin="round"*/}
      {/*      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"*/}
      {/*    />*/}
      {/*  </svg>*/}
      {/*</button>*/}
    </p>
  );
};

export default Alarm;
