"use client";
import React from "react";
import { cls, dateFormattedtoDot } from "@/libs/client/utils";
import Tag from "@/component/tag";
import { useRouter } from "next/navigation";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";

const Pay = ({ members }: { members: IMemberWithSchedules[] }) => {
  const router = useRouter();
  return (
    <div
      className="box row-span-2 flex-col hover:shadow-lg cursor-pointer transition-all h-1/3 md:h-full"
      onClick={() => router.push("/pay")}
      data-testid="member-mainbox"
    >
      <div className="box_title">회원 관리</div>
      <div className="overflow-y-auto">
        <table className="text-center w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="*:font-semibold *:py-2">
              <td>이름</td>
              <td>연락처</td>
              <td>담당</td>
              <td>납부</td>
            </tr>
          </thead>
          <tbody>
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
                  <tr
                    key={`main_member_${index}`}
                    className={cls(
                      "*:font-medium *:py-3 *:text-center",
                      member?.Payment?.length <= 0 ? "bg-orange-50" : "",
                    )}
                  >
                    <td>{member.name}</td>
                    <td>{member.phone}</td>
                    <td>{member.worker.name}</td>
                    <td className="flex justify-center">
                      {member.status === 0 && member.endDate ? (
                        <span className="text-xs">
                          <Tag
                            color={"stone"}
                            title={`${dateFormattedtoDot(member.endDate)} 탈퇴`}
                          />
                        </span>
                      ) : member.status < 0 ||
                        (member?.Payment &&
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
                ))}
            {/*{Array.from({ length: 20 }, (_, index) => ({*/}
            {/*  name: "양지윤",*/}
            {/*  phone: `010-0000-${index.toString().padStart(4, "0")}`, // 예시: "010-0000-0001"*/}
            {/*  worker: "이상혁",*/}
            {/*  pay: index % 7 !== 0,*/}
            {/*})).map((item, index) => (*/}
            {/*  <tr*/}
            {/*    key={index}*/}
            {/*    className={cls(*/}
            {/*      "*:font-medium *:py-3 *:text-center",*/}
            {/*      item.pay ? "bg-orange-50" : "",*/}
            {/*    )}*/}
            {/*  >*/}
            {/*    <td>{item.name}</td>*/}
            {/*    <td>{item.phone}</td>*/}
            {/*    <td>{item.worker}</td>*/}
            {/*    <td className="flex justify-center">*/}
            {/*      {item.pay ? (*/}
            {/*        <span className="text-xs">*/}
            {/*          <Tag color={"orange"} title={"미납"} />*/}
            {/*        </span>*/}
            {/*      ) : (*/}
            {/*        <span className="text-xs">*/}
            {/*          <Tag color={"emerald"} title={"납부"} />*/}
            {/*        </span>*/}
            {/*      )}*/}
            {/*    </td>*/}
            {/*  </tr>*/}
            {/*))}*/}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pay;
