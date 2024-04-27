"use client";
import React, { useState } from "react";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DAYOFWEEK } from "@/libs/constants";
import { formatPhone } from "@/libs/client/utils";

const PayMb = ({ members }: { members: Member[] }) => {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState(["미납", "납부완료"]);
  const selectTag = (tag: string) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag((prev) => prev.filter((item) => item != tag));
    } else {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Tag
            color={"orange"}
            noBg={!selectedTag.includes("미납")}
            title={"미납"}
            onClick={() => selectTag("미납")}
          />
          <Tag
            color={"stone"}
            noBg={!selectedTag.includes("납부완료")}
            title={"납부완료"}
            onClick={() => selectTag("납부완료")}
          />
        </div>
      </div>
      {members &&
        members
          .sort((a, b) => {
            const aHasPayment = a.Payment ? 1 : 0;
            const bHasPayment = b.Payment ? 1 : 0;
            return aHasPayment - bHasPayment;
          })
          .map((member, index) => (
            <LineBox
              key={`pay_mb_${member.id}`}
              onClick={() => router.push(`/pay/${member.id}`)}
              worker={member.worker.name}
              day={member.Schedule.map(
                (item, index) => DAYOFWEEK[item.dayOfWeek],
              )}
              name={member.name}
              phone={formatPhone(member.phone)}
              active={member.status > 0}
              isNotPaid={!member.Payment}
            />
          ))}
    </>
  );
};

export default PayMb;
