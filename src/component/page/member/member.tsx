"use client";
import React from "react";
import { DAYOFWEEK } from "@/libs/constants";
import { cls, dateFormattedtoKor } from "@/libs/client/utils";
import { Memo, Member, Worker, Schedule } from "@prisma/client";
import { useRouter } from "next/navigation";
const Member = ({ member }: { member: Member }) => {
  const router = useRouter();
  return (
    <tr
      onClick={() => router.push(`/member/${member.id}`)}
      className={cls(
        "*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200",
        member.status < 0 ? "bg-stone-200" : "",
      )}
    >
      <td>{member.name}</td>
      <td>{member.phone}</td>
      <td>{member.worker.name}</td>
      <td>{member.Schedule.map((item, index) => DAYOFWEEK[item.dayOfWeek])}</td>
      <td>{dateFormattedtoKor(member?.createdAt)}</td>
    </tr>
  );
};

export default Member;
