"use client";
import React, { useEffect, useState } from "react";
import { cls, dateFormattedtoDot } from "@/libs/client/utils";
import Tag from "@/component/tag";
import { useRouter } from "next/navigation";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import RegisterWorkers from "@/component/page/main/BulkUploadHandlers/worker/registerWorkers";
import Modal from "@/component/modal/modal";
import WorkerExcelModal from "@/component/page/main/BulkUploadHandlers/worker/workerExcelModal";
import MemberExcelModal from "@/component/page/main/BulkUploadHandlers/member/memberExcelModal";
import { getMembers } from "@/app/(tabBar)/member/api";
import InfiniteScroll from "@/component/infiniteScroll";
import Loading from "./loading";

const Member = ({
  year,
  month,
  registerOpen,
}: {
  year: number;
  month: number;
  registerOpen: boolean;
}) => {
  const router = useRouter();

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [members, setMembers] = useState<IMemberWithSchedules[]>();
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers({
          params: {
            query: "",
            year,
            month,
            page,
          },
        });
        if (response) {
          setMembers((prevData) => {
            const addData = response.members?.filter(
              (newMembers) =>
                !prevData?.some(
                  (existingMember) => existingMember.id === newMembers.id,
                ),
            );
            return [...(prevData || []), ...(addData || [])];
          });
          setTotal(response.total);
          setLoading(false);
        }
      } catch (e) {
        return new Error("error fetch members");
      }
    };
    fetchMembers();
  }, [page]);

  return (
    <>
      {isMemberModalOpen && (
        <Modal
          title={"회원 엑셀 등록"}
          content={
            <MemberExcelModal onClose={() => setIsMemberModalOpen(false)} />
          }
          className={"!w-4/5 !h-4/5"}
          onClose={() => setIsMemberModalOpen(false)}
        />
      )}
      <div
        className={cls(
          "box row-span-2 flex-col hover:shadow-lg cursor-pointer transition-all h-96 xl:h-full",
          registerOpen ? "" : "!cursor-default",
        )}
        onClick={() =>
          members && members.length > 0
            ? router.push("/pay")
            : registerOpen && setIsMemberModalOpen(true)
        }
        data-testid="member-mainbox"
      >
        <div className="box_title">회원 관리</div>

        <div className="flex flex-col grow overflow-y-auto">
          {loading ? (
            <Loading />
          ) : members && members.length > 0 ? (
            <table className="text-center w-full">
              <thead className="sticky top-0 bg-white z-20">
                <tr className="*:font-semibold *:py-2">
                  <td>이름</td>
                  <td>연락처</td>
                  <td>담당</td>
                  <td>납부</td>
                </tr>
              </thead>
              <tbody className="relative">
                <InfiniteScroll setSlice={setPage} loading={loading}>
                  <>
                    {members &&
                      members
                        .sort((a, b) => {
                          const aHasPayment =
                            a.status === 0
                              ? -2
                              : a.Payment && a.Payment.length > 0
                                ? a.Payment[0].lessonFee &&
                                  a.Payment[0]?.lessonFee < 0
                                  ? -1
                                  : 0
                                : 1;
                          const bHasPayment =
                            b.status === 0
                              ? -2
                              : b.Payment && b.Payment.length > 0
                                ? b.Payment[0]?.lessonFee &&
                                  b.Payment[0]?.lessonFee < 0
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
                              member?.Payment && member?.Payment?.length <= 0
                                ? "bg-orange-50"
                                : "",
                            )}
                          >
                            <td>{member.name}</td>
                            <td>{member.phone}</td>
                            <td>{member.worker?.name}</td>
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
                                  member?.Payment[0] &&
                                  member?.Payment[0]?.lessonFee &&
                                  member?.Payment[0]?.lessonFee < 0) ? (
                                <span className="text-xs">
                                  <Tag
                                    color={"yellow"}
                                    title={`${dateFormattedtoDot(member.suspendedDate)} 중단`}
                                  />
                                </span>
                              ) : member?.Payment &&
                                member?.Payment?.length > 0 ? (
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
                  </>
                </InfiniteScroll>
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col grow px-5 py-2">
              <div
                className={cls(
                  "grow mb-4 flex flex-col items-center justify-center space-y-3 font-semibold text-xl ",
                  registerOpen
                    ? "text-green-700 hover:text-green-700/80 transition-all cursor-pointer"
                    : "text-stone-400",
                )}
              >
                <div className={cls(registerOpen ? "animate-bounce" : "")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>
                </div>
                <p>등록된 회원이 없습니다</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Member;
