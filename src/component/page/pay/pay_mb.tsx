"use client";
import React, { useEffect, useRef, useState } from "react";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DAYOFWEEK } from "@/libs/constants";
import { formatPhone } from "@/libs/client/utils";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import InfiniteScroll from "@/component/infiniteScroll";

const PayMb = ({
  members,
  setPayStatus,
  payStatus,
  setPage,
  loading,
}: {
  members: IMemberWithSchedules[];
  setPayStatus: React.Dispatch<React.SetStateAction<number>>;
  payStatus: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}) => {
  const router = useRouter();
  const [data, setData] = useState<IMemberWithSchedules[]>(members);
  useEffect(() => {
    setData([]);
    setPage(1);
  }, [payStatus]);

  useEffect(() => {
    setData((prevData) => {
      const addData = members.filter(
        (newMembers) =>
          !prevData.some(
            (existingMember) => existingMember.id === newMembers.id,
          ),
      );
      return [...prevData, ...addData];
    });
  }, [members]);
  // const selectTag = (tag: number) => {
  // setPayStatus(tag)
  // };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Tag
            color={"orange"}
            noBg={payStatus > 0}
            title={"미납"}
            onClick={() => setPayStatus(-1)}
            className={"cursor-pointer"}
          />
          <Tag
            color={"stone"}
            noBg={payStatus < 0}
            title={"납부완료"}
            onClick={() => setPayStatus(1)}
            className={"cursor-pointer"}
          />
        </div>
      </div>
      <div className="relative space-y-3">
        <InfiniteScroll setPage={setPage} loading={loading}>
          <>
            {data &&
              data
                // .sort((a, b) => {
                //   const aHasPayment =
                //     a.status === 0
                //       ? -2
                //       : a.Payment.length > 0
                //         ? a.Payment[0]?.lessonFee < 0
                //           ? -1
                //           : 0
                //         : 1;
                //   const bHasPayment =
                //     b.status === 0
                //       ? -2
                //       : b.Payment.length > 0
                //         ? b.Payment[0]?.lessonFee < 0
                //           ? -1
                //           : 0
                //         : 1;
                //   return bHasPayment - aHasPayment;
                // })
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
                          (member?.Payment &&
                            member?.Payment[0]?.lessonFee < 0) ? (
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
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PayMb;
