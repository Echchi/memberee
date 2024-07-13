"use client";
import React from "react";
import { Member } from "@prisma/client";
import LineBox from "../../lineBox";
import { DAYOFWEEK } from "../../../libs/constants";
import { formatPhone } from "../../../libs/client/utils";
import { useRouter } from "next/navigation";
import { IMemberWithSchedules } from "../../../app/(tabBar)/member/[id]/page";

const MemberMb = ({ member }: { member: IMemberWithSchedules }) => {
  const router = useRouter();
  return (
    <>
      {member.status === 0 ? (
        <></>
      ) : (
        <div className="xl:hidden flex flex-col space-y-3 mt-5">
          <LineBox
            onClick={() => router.push(`/member/${member.id}`)}
            worker={member.worker?.name}
            day={member.Schedule?.map(
              (item, index) => DAYOFWEEK[item.dayOfWeek],
            ).join("  ")}
            name={member.name}
            phone={formatPhone(member.phone)}
            active={member.status > 0}
          />
        </div>
      )}
    </>
  );
};

export default MemberMb;
