"use client";
import React, { useEffect, useRef, useState } from "react";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DAYOFWEEK } from "@/libs/constants";
import { cls, formatPhone } from "@/libs/client/utils";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import InfiniteScroll from "@/component/infiniteScroll";
import Link from "next/link";
import SendMsg from "@/component/page/pay/sendMsg";
import Empty from "@/component/empty";

const PayMb = ({
  members,
  setPayStatus,
  payStatus,
  slice,
  setSlice,
  loading,
  query,
  year,
  month,
}: {
  members: IMemberWithSchedules[];
  setPayStatus: React.Dispatch<React.SetStateAction<number>>;
  payStatus: number;
  slice: number;
  setSlice: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
  query?: string;
  year: number;
  month: number;
}) => {
  const router = useRouter();
  const [data, setData] = useState<IMemberWithSchedules[]>(members);
  console.log("members", members);
  useEffect(() => {
    setSlice(1);
    setData([]);
  }, [payStatus, query]);

  // console.log("year, month", year, month);
  useEffect(() => {
    // console.log("data", data);
  }, [data]);

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
  }, [members, slice]);

  useEffect(() => {
    setData(members);
  }, [members, year, month]);

  useEffect(() => {
    setSlice(1);
  }, [year, month]);

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
        <SendMsg year={year} month={month} loading={loading} />
      </div>
      <div className="relative space-y-3">
        {!loading ? (
          data.length > 0 ? (
            <InfiniteScroll setSlice={setSlice} loading={loading || false}>
              <>
                {data &&
                  data.map((member, index) => (
                    <LineBox
                      key={`pay_mb_${member.id}`}
                      onClick={() => router.push(`/pay/${member.id}`)}
                      worker={member.worker?.name}
                      day={member.Schedule?.map(
                        (item, index) => DAYOFWEEK[item.dayOfWeek],
                      ).join("  ")}
                      name={
                        <span className="flex items-center space-x-2">
                          <span>{member.name}</span>
                          {member.status === 0 && member.endDate ? (
                            <span className="text-xs">
                              <Tag color="stone" title="탈퇴" />
                            </span>
                          ) : member.status < 0 ||
                            (member?.Payment &&
                              member?.Payment[0]?.lessonFee &&
                              member?.Payment[0]?.lessonFee < 0) ? (
                            <span className="text-xs">
                              <Tag color="yellow" title="중단" />
                            </span>
                          ) : null}
                        </span>
                      }
                      phone={formatPhone(member.phone)}
                      active={
                        member.status > 0 ||
                        (member?.Payment && Number(member?.Payment[0]) < 0) ||
                        false
                      }
                      isNotPaid={
                        member?.Payment && member?.Payment.length === 0
                      }
                    />
                  ))}
              </>
            </InfiniteScroll>
          ) : (
            <>
              <Empty msg={"내역이 없습니다"} className="!my-auto" />
            </>
          )
        ) : (
          <>
            {[...Array(6)].map((_, index) => (
              <div
                key={`pay_mb_loading_${index}`}
                className="rounded-lg p-3 w-full bg-neutral-100 animate-pulse h-20"
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PayMb;
