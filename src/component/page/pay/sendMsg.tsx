"use client";
import React, { useEffect, useState } from "react";
import { getMembers } from "@/app/(tabBar)/member/api";
import { getPaidCnt } from "@/app/(tabBar)/main/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import Link from "next/link";

const SendMsg = ({
  year,
  month,
  isAllMember = false,
}: {
  year: number;
  month: number;
  isAllMember?: boolean;
}) => {
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
            payStatus: isAllMember ? 0 : -1,
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
        className="text-sm lg:text-base outline-none px-3 py-2 rounded-lg text-orange-600 font-semibold transition-all disabled:bg-gray-300 disabled:cursor-default bg-orange-500/30 hover:bg-orange-500/10 active:bg-orange-500/40 cursor-pointer"
      >
        {isAllMember
          ? "전체 회원에게 메세지 보내기"
          : `미납자 ${total}명 에게 메세지 보내기`}
      </Link>
    </div>
  );
};

export default SendMsg;
