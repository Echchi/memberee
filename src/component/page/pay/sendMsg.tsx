"use client";
import React, { useEffect, useState } from "react";
import { getMembers } from "@/app/(tabBar)/member/api";
import { getPaidCnt } from "@/app/(tabBar)/main/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import Link from "next/link";

const SendMsg = ({ year, month }: { year: number; month: number }) => {
  const [nums, setNums] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    console.log("year", year, "month", month);
    const fetchMembers = async () => {
      try {
        const response = await getMembers({
          params: {
            query: "",
            year,
            month,
            payStatus: -1,
            isAll: true,
          },
        });

        if (response) {
          console.log("SendMsg", response);
          setTotal(response.total);
          const res = response.members.map((mem) => mem.phone);
          console.log("res", res);
          setNums(res);
        }
      } catch (e) {
        return new Error("error fetch members");
      }
    };

    fetchMembers();
  }, [year, month]);
  return (
    <div>
      <Link
        href={`sms:${nums.join(",")}`}
        className="text-sm lg:text-base outline-none px-3 py-2 rounded-lg text-white font-semibold transition-all disabled:bg-gray-300 disabled:cursor-default bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 cursor-pointer"
      >
        미납자 {total}명 에게 메세지 보내기
      </Link>
    </div>
  );
};

export default SendMsg;
