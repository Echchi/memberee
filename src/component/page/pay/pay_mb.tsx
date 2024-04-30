"use client";
import React, { useState } from "react";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DAYOFWEEK } from "@/libs/constants";
import { formatPhone } from "@/libs/client/utils";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";

const PayMb = ({ members }: { members: IMemberWithSchedules[] }) => {
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
            const aHasPayment =
              a.status === 0
                ? -2
                : a.Payment.length > 0
                  ? a.Payment[0]?.lessonFee < 0
                    ? -1
                    : 0
                  : 1;
            const bHasPayment =
              b.status === 0
                ? -2
                : b.Payment.length > 0
                  ? b.Payment[0]?.lessonFee < 0
                    ? -1
                    : 0
                  : 1;
            return bHasPayment - aHasPayment;
          })
          .map((member, index) => (
            <LineBox
              key={`pay_mb_${member.id}`}
              onClick={() => router.push(`/pay/${member.id}`)}
              worker={member.worker?.name}
              day={member.Schedule?.map(
                (item, index) => DAYOFWEEK[item.dayOfWeek],
              ).join("")}
              name={
                <span className="flex items-center space-x-2">
                  <span>{member.name}</span>
                  {member.status === 0 && member.endDate ? (
                    <span className="text-xs">
                      <Tag color="stone" title="탈퇴" />
                    </span>
                  ) : member.status < 0 ||
                    (member?.Payment && member?.Payment[0]?.lessonFee < 0) ? (
                    <span className="text-xs">
                      <Tag color="yellow" title="중단" />
                    </span>
                  ) : null}
                </span>
              }
              phone={formatPhone(member.phone)}
              active={member.status > 0 || member?.Payment[0] < 0}
              isNotPaid={member?.Payment && member?.Payment.length === 0}
            />
          ))}
    </>
  );
};

export default PayMb;
