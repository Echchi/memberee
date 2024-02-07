"use client";
import { format } from "date-fns";
import React, { useState } from "react";
import TimeTable from "@/component/timeTable";
import { cls } from "@/libs/client/utils";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const today = format(new Date(), "yyyy년 MM월 dd일 ");
  const [alarmHide, setAlramHide] = useState(false);
  const handleHideBtn = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAlramHide(true);
  };
  return (
    <>
      <p
        onClick={() => router.push("/member")}
        className={cls(
          "cursor-pointer flex items-center justify-between py-2 md:py-3 w-full bg-gradient-to-r from-orange-200 from-5% to-orange-300 rounded-full px-5 md:px-8 mt-3 font-semibold text-orange-600 animate-pulse",
          alarmHide ? "hidden" : "",
        )}
      >
        <span className="text-xs md:text-base">
          이번 달(2월) 납부 내역이 확인되지 않은 회원이 3명 있어요
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
      <div className="md:grid grid-cols-2 grid-rows-3 gap-3 mt-4 lg:mt-12 h-[700px]">
        <div className="box flex-col row-span-3 hover:shadow-lg cursor-pointer transition-all h-1/2 md:h-full">
          <span className="box_title">{today} 수업</span>
          <div className="overflow-y-auto mt-3">
            <TimeTable />
          </div>
        </div>
        <div
          className="box flex-col justify-center space-x-2 md:!py-2 cursor-pointer hover:shadow-lg"
          onClick={() => router.push("/worker")}
        >
          <div className="box_title">직원 관리</div>
          <div className="flex overflow-x-auto">
            <div className="flex flex-col justify-evenly items-center rounded-lg min-x-fit px-5 py-2 hover:bg-orange-100 cursor-pointer transition-all">
              <div className="rounded-full bg-gray-300 mb-4 h-20 w-20" />
              <p className="text-base md:text-lg font-semibold">함코치</p>
              <p className="text-sm md:text-base font-medium whitespace-no식wrap">
                주중
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg min-x-fit px-5 py-2 hover:bg-orange-100 cursor-pointer transition-all">
              <div className="rounded-full bg-gray-300 mb-4 h-20 w-20" />
              <p className="text-base md:text-lg font-semibold">이코치</p>
              <p className="text-sm md:text-base font-medium whitespace-nowrap">
                주중
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg min-x-fit px-5 py-2 hover:bg-orange-100 cursor-pointer transition-all">
              <div className="rounded-full bg-gray-300 mb-4 h-20 w-20" />
              <p className="text-base md:text-lg font-semibold">장코치</p>
              <p className="text-sm md:text-base font-medium whitespace-nowrap">
                주말
              </p>
            </div>
          </div>
        </div>

        <div className="box row-span-2 flex-col hover:shadow-lg cursor-pointer transition-all h-1/3 md:h-full">
          <div className="box_title">회원 관리</div>
          <div className="overflow-y-auto">
            <table className="text-center w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="*:font-semibold *:py-2">
                  <td>이름</td>
                  <td>연락처</td>
                  <td>담당</td>
                  <td>납부</td>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }, (_, index) => ({
                  name: "양지윤",
                  phone: `010-0000-${index.toString().padStart(4, "0")}`, // 예시: "010-0000-0001"
                  worker: "이상혁",
                  pay: index % 7 !== 0,
                })).map((item, index) => (
                  <tr
                    key={index}
                    className={cls(
                      "*:font-medium *:py-3 *:text-center",
                      item.pay ? "bg-orange-50" : "",
                    )}
                  >
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.worker}</td>
                    <td className="flex justify-center">
                      {item.pay ? (
                        <></>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 text-emerald-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
