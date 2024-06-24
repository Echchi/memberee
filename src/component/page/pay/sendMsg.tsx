"use client";
import React, { useEffect, useState } from "react";
import { getMembers } from "@/app/(tabBar)/member/api";
import { getPaidCnt } from "@/app/(tabBar)/main/api";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import Link from "next/link";
import { cls } from "@/libs/client/utils";

const SendMsg = ({
  year,
  month,
  loading,
  isAllMember = false,
}: {
  year: number;
  month: number;
  isAllMember?: boolean;
  loading?: boolean;
}) => {
  const [nums, setNums] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
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
          setTotal(response.total);
          const res = response.members.map((mem) => mem.phone);

          setNums(res);
        }
      } catch (e) {
        return new Error("error fetch members");
      }
    };

    if (!loading) fetchMembers();
  }, [year, month, loading]);
  return (
    <div>
      <Link
        href={`sms:${nums.join(",")}`}
        className={cls(
          "text-sm xl:text-base outline-none px-3 py-2 rounded-lg font-semibold transition-all disabled:bg-gray-300 disabled:cursor-default  cursor-pointer",
          isAllMember
            ? "text-green-600 bg-green-600/30 hover:bg-green-600/10 active:bg-green-600/40"
            : "text-orange-600 bg-orange-500/30 hover:bg-orange-500/10 active:bg-orange-500/40",
        )}
      >
        {isAllMember
          ? "전체 회원에게 메세지 보내기"
          : `미납자 ${total}명 에게 메세지 보내기`}
      </Link>
    </div>
  );
};

export default SendMsg;
