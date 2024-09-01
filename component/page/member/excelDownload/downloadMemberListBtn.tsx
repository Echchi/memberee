"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../../button/button";
import { downloadMemberList } from "./downloadMemberList";
import { getMembers } from "../../../../app/(tabBar)/member/api";
import { format, getMonth, getYear } from "date-fns";
import { IMemberWithSchedules } from "../../../../app/(tabBar)/member/[id]/page";
import {
  dateFormattedtoKor,
  dateFormattedtoNum,
  formatCurrency,
  formatKorDate,
  formatPhone,
} from "../../../../libs/client/utils";
import { DAYOFWEEK } from "../../../../libs/constants";

const DownloadMemberListBtn = () => {
  const [loading, setLoading] = useState(false);
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;
  const [members, setMembers] = useState<IMemberWithSchedules[]>([]);
  const [total, setTotal] = useState<number>();
  const [clicked, setClicked] = useState(false);
  const fetchMembers = async () => {
    try {
      const response = await getMembers({
        params: {
          query: "",
          year,
          month,
          isAll: true,
        },
      });
      if (response.members) {
        setMembers(response.members);
        setTotal(response.total);
      }
    } catch (e) {
      return new Error("error fetch members");
    }
  };
  useEffect(() => {
    const handleDownload = async () => {
      if (clicked) {
        setLoading(true);
        await fetchMembers();

        setLoading(false);
      }
    };
    handleDownload();
  }, [clicked]);

  const header = [
    { header: "이름", key: "name" },
    { header: "연락처", key: "phone" },
    { header: "생년월일", key: "birth" },
    { header: "직업", key: "job" },
    { header: "요일", key: "dayOfWeek" },
    { header: "시간", key: "times" },
    { header: "수업료", key: "lessonFee" },
    { header: "담당", key: "worker" },
    { header: "시작일자", key: "startDate" },
    { header: "상태", key: "stauts" },
  ];

  useEffect(() => {
    if (!loading && members.length > 0) {
      const content = members.map((member) => {
        const formattedDayOfWeek = member?.Schedule?.map(
          (sch) => DAYOFWEEK[sch.dayOfWeek],
        ).join(", ");
        const formattedTimes = member.Schedule?.map(
          (sch) =>
            `${format(sch.startTime || "", "HH:mm")} ~ ${format(sch.endTime || "", "HH:mm")}`,
        ).join(", ");
        return {
          name: member.name,
          phone: formatPhone(member.phone),
          birth: dateFormattedtoKor(member?.birth),
          job: member.job,
          dayOfWeek: formattedDayOfWeek,
          times: formattedTimes,
          lessonFee:
            formatCurrency(
              (member.Schedule && member.Schedule[0]?.lessonFee) || "",
            ) || "-",
          worker: member.worker?.name,
          startDate: dateFormattedtoKor(member?.startDate),
          status:
            member.status === 0 ? "중단" : member.status < 0 ? "탈퇴" : "",
        };
      });
      downloadMemberList({
        title: `회원 명단 출력`,
        header,
        total,
        content,
      });
      setClicked(false);
    }
  }, [members, total]);

  const handleOnClick = () => {
    if (!loading) {
      setClicked(true);
    }
  };

  return (
    <Button
      text={loading ? "로딩중" : "출력"}
      className="py-3 hidden xl:block"
      isButtonDisabled={loading}
      onClick={handleOnClick}
    />
  );
};

export default DownloadMemberListBtn;
