"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getMembers } from "../../../app/(tabBar)/member/api";

import Link from "next/link";
import { cls } from "../../../libs/client/utils";

const SendMsg = ({
  year,
  month,
  loading,
  isAllMember = false,
  payDay,
  text,
  className,
}: {
  year: number;
  month: number;
  isAllMember?: boolean;
  loading?: boolean;
  payDay?: number;
  text?: string;
  className?: string;
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
            payDay,
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

    const mediaQuery = window.matchMedia(`(min-width : 1280px)`);

    const handleMediaQuery = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        fetchMembers();
      }
    };
    mediaQuery.addEventListener("change", handleMediaQuery);

    if (!mediaQuery.matches) {
      fetchMembers();
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuery);
    };
  }, [year, month, loading]);
  return (
    <div>
      <Link
        href={`sms:${nums.join(",")}`}
        className={cls(
          "text-sm xl:text-base outline-none px-3 py-2 rounded-lg font-semibold transition-all disabled:bg-gray-300 disabled:cursor-default  cursor-pointer",
          isAllMember || payDay
            ? "text-green-600 bg-green-600/30 hover:bg-green-600/10 active:bg-green-600/40"
            : "text-orange-600 bg-orange-500/30 hover:bg-orange-500/10 active:bg-orange-500/40",
        )}
      >
        {isAllMember
          ? "전체 회원에게 메세지 보내기"
          : payDay
            ? `오늘 납부자 ${total}명에게 메세지 보내기`
            : `미납자 ${total}명에게 메세지 보내기`}
      </Link>
    </div>
  );
};

export default SendMsg;
