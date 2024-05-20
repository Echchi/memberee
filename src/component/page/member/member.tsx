"use client";
import React from "react";
import { DAYOFWEEK } from "@/libs/constants";
import { cls, dateFormattedtoKor } from "@/libs/client/utils";
import { useRouter } from "next/navigation";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
const Member = ({ member }: { member: IMemberWithSchedules }) => {
  const router = useRouter();
  return (
    <>
      {member?.status === 0 ? (
        <></>
      ) : (
        <tr
          onClick={() => router.push(`/member/${member.id}`)}
          className={cls(
            "*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200",
            member.status < 0 ? "bg-stone-200" : "",
          )}
        >
          <td>{member.name}</td>
          <td>{member.phone}</td>
          <td>{member.worker?.name}</td>
          <td>
            {member.Schedule?.map(
              (item, index) => DAYOFWEEK[item.dayOfWeek],
            ).join("  ")}
          </td>
          <td>{dateFormattedtoKor(member?.startDate)}</td>
        </tr>
      )}
    </>
  );
};

export default Member;
