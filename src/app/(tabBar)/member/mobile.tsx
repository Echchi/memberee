"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import MemberMb from "@/component/page/member/member_mb";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import InfiniteScroll from "@/component/infiniteScroll";

const Mobile = ({
  members,
  setPage,
  loading,
}: {
  members: IMemberWithSchedules[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}) => {
  const target = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<IMemberWithSchedules[]>(members);

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
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (!entry.isIntersecting || loading) return;
  //         setPage((prev) => prev + 1);
  //       });
  //     },
  //     { threshold: 1.0 },
  //   );
  //
  //   if (target.current) {
  //     observer.observe(target.current);
  //   }
  //
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [loading, target, loading]);

  return (
    <>
      <div className="lg:hidden relative flex flex-col space-y-3 mt-5 overscroll-y-auto">
        <InfiniteScroll setPage={setPage} loading={loading}>
          <>
            {data &&
              data.map((member, index) => (
                <MemberMb member={member} key={`memberMb_${member.id}`} />
              ))}
          </>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Mobile;
