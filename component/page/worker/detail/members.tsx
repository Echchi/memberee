"use client";
import React, { useEffect, useState } from "react";
import { Member } from "@prisma/client";
import { getWorker } from "../../../../app/(tabBar)/worker/[id]/api";

import { dateFormattedtoKor } from "../../../../libs/client/utils";
import { MemberWithSch } from "../../../../app/(tabBar)/worker/[id]/page";
import { DAYOFWEEK } from "../../../../libs/constants";
import { useRouter } from "next/navigation";
import Empty from "../../../empty";
import InfiniteScroll from "../../../infiniteScroll";

const Members = ({
  members,
  setMemSlice,
  loading,
}: {
  members: MemberWithSch[];
  setMemSlice: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}) => {
  const router = useRouter();

  return (
    <>
      <div className="text-stone-600 font-bold text-base xl:text-lg flex justify-center items-center h-16 bg-neutral-100 col-span-2 border-x border-t border-neutral-300">
        담당 회원
      </div>
      {members.length > 0 ? (
        <div className="*:bg-white col-span-2 print:border-0 border border-stone-300 rounded-b-lg h-[40vh] overflow-y-auto print:overflow-visible">
          {/*<InfiniteScroll setSlice={setMemSlice} loading={loading}>*/}
          <table className="w-full table-auto">
            <thead>
              <tr className="sticky top-0 bg-stone-100 font-semibold *:text-sm xl:*:text-lg text-center *:py-3 print:border print:border-stone-300">
                <td>이름</td>
                <td>연락처</td>
                <td>요일</td>
                <td className="flex justify-center items-center">등록일</td>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={index}
                  onClick={() => router.push(`/member/${member.id}`)}
                  className="*:py-3 text-center border-b print:border-stone-300 hover:bg-orange-100 cursor-pointer active:bg-orange-200 print:border-x *:text-sm xl:*:text-base"
                >
                  <td>{member.name}</td>
                  <td>{member.phone}</td>

                  <td>
                    {member.Schedule.map(
                      (item, index) => DAYOFWEEK[item.dayOfWeek],
                    ).join("  ")}
                  </td>
                  <td>{dateFormattedtoKor(member.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*</InfiniteScroll>*/}
        </div>
      ) : !loading ? (
        <Empty
          item={"담당회원"}
          className="border border-neutral-300 rounded-b-lg *:!text-stone-300"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Members;
