"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import MemberMb from "@/component/page/member/member_mb";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import InfiniteScroll from "@/component/infiniteScroll";
import SendMsg from "@/component/page/pay/sendMsg";
import { getMonth, getYear } from "date-fns";

const Mobile = ({
  members,
  setSlice,
  loading,
  query,
}: {
  members: IMemberWithSchedules[];
  setSlice: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  query?: string;
}) => {
  const [data, setData] = useState<IMemberWithSchedules[]>(members);
  useEffect(() => {
    setSlice(1);
    setData([]);
  }, [query]);

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

  return (
    <>
      <div className="lg:hidden relative flex flex-col space-y-3 mt-5 overscroll-y-auto">
        <div className="flex mb-2">
          <SendMsg
            year={getYear(new Date())}
            month={getMonth(new Date())}
            isAllMember={true}
          />
        </div>
        {!loading && data.length > 0 ? (
          <InfiniteScroll setSlice={setSlice} loading={loading}>
            <>
              {data &&
                data.map((member, index) => (
                  <MemberMb member={member} key={`memberMb_${member.id}`} />
                ))}
            </>
          </InfiniteScroll>
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

export default Mobile;
