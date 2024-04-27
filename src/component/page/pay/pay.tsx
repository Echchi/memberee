"use client";
import React from "react";
import Tag from "@/component/tag";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";

const Pay = ({ member }: { member: IMemberWithSchedules }) => {
  console.log("member", member);
  const router = useRouter();
  return (
    <tr
      key={member.id}
      onClick={() => router.push(`pay/${member.id}`)}
      className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
    >
      <td>{member.name}</td>
      <td>{member.phone}</td>
      <td>{member?.worker?.name}</td>

      <td className="flex justify-center items-center">
        {member.status < 0 || member.Payment.lessonFee < 0 ? (
          <span className="text-xs">
            <Tag color={"yellow"} title={"중단"} />
          </span>
        ) : member?.Payment && member?.Payment?.length > 0 ? (
          <span className="text-xs">
            <Tag color={"emerald"} title={"납부"} />
          </span>
        ) : (
          <span className="text-xs">
            <Tag color={"orange"} title={"미납"} />
          </span>
        )}
      </td>
      {/*<td>*/}
      {/*  {member.pay < 0 ? (*/}
      {/*    <div className="flex justify-center items-center">*/}
      {/*      <span className="text-xs">*/}
      {/*        <Tag color={"orange"} title={"연체"} />*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <></>*/}
      {/*  )}*/}
      {/*</td>*/}
    </tr>
  );
};

export default Pay;
