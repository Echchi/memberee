"use client";
import React from "react";
import { Member } from "@prisma/client";
import LineBox from "@/component/lineBox";
import { DAYOFWEEK } from "@/libs/constants";
import { formatPhone } from "@/libs/client/utils";
import { useRouter } from "next/navigation";

const MemberMb = ({ member }: { member: Member }) => {
  const router = useRouter();
  return (
    <div className="lg:hidden flex flex-col space-y-3 mt-5">
      <LineBox
        onClick={() => router.push(`/member/${member.id}`)}
        worker={member.worker.name}
        day={member.Schedule.map((item, index) => DAYOFWEEK[item.dayOfWeek])}
        name={member.name}
        phone={formatPhone(member.phone)}
        active={member.status > 0}
      />
    </div>
  );
};

export default MemberMb;
