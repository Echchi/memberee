"use client";
import React from "react";
import Tag from "../../tag";
import { useRouter } from "next/navigation";
import { IMemberWithSchedules } from "../../../app/(tabBar)/member/[id]/page";
import { dateFormattedtoDot, formatCurrency } from "../../../libs/client/utils";
import { PaymentType } from "@prisma/client";

const Pay = React.memo(
  ({
    member,
    paymentType,
  }: {
    member: IMemberWithSchedules;
    paymentType: PaymentType;
  }) => {
    const router = useRouter();

    return (
      <tr
        key={member.id}
        onClick={() => router.push(`pay/${member.id}`)}
        className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
      >
        <td>{member.name}</td>
        <td>{member.phone}</td>
        <td>{member.worker?.name}</td>
        <td>
          {formatCurrency(
            (member.Schedule && member.Schedule[0]?.lessonFee) || "",
          ) || "-"}
        </td>

        {paymentType === PaymentType.DIFFERENT ? (
          <td>{member.payDay} 일</td>
        ) : null}

        <td className="flex justify-center items-center">
          {member.status === 0 && member.endDate ? (
            <span className="text-xs">
              <Tag
                color={"stone"}
                title={`${dateFormattedtoDot(member.endDate)} 탈퇴`}
              />
            </span>
          ) : member.status < 0 ||
            (member?.Payment &&
              member?.Payment[0] &&
              member?.Payment[0]?.lessonFee &&
              member?.Payment[0]?.lessonFee < 0) ? (
            <span className="text-xs">
              <Tag
                color={"yellow"}
                title={`${dateFormattedtoDot(member.suspendedDate)} 중단`}
              />
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
      </tr>
    );
  },
);

Pay.displayName = "Pay";

export default Pay;
