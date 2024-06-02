"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/component/button/button";
import { downloadMemberList } from "@/component/page/member/excelDownload/downloadMemberList";
import { getMembers } from "@/app/(tabBar)/member/api";
import { format, getMonth, getYear } from "date-fns";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import {
  dateFormattedtoKor,
  dateFormattedtoNum,
  formatCurrency,
  formatKorDate,
  formatPhone,
} from "@/libs/client/utils";
import { DAYOFWEEK } from "@/libs/constants";

const DownloadMemberListBtn = () => {
  const [loading, setLoading] = useState(false);
  const year = getYear(new Date());
  const month = getMonth(new Date()) + 1;
  const [members, setMembers] = useState<IMemberWithSchedules[]>([]);
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    setLoading(true);
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
        if (response) {
          // console.log("members response", response);
          setMembers(response.members);
          setTotal(response.total);
        }
      } catch (e) {
        return new Error("error fetch members");
      }
    };

    fetchMembers();
    setLoading(false);
  }, []);

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
      status: member.status === 0 ? "중단" : member.status < 0 ? "탈퇴" : "",
    };
  });

  const tmp = [
    {
      name: "예시",
      phone: "숫자로만 기입해주세요",
      birth: "생년월일를 8자리로 기입해주세요",
      job: "직업",
      dayOfWeek: ",로 구분",
      times: `요일 별 순서대로 시작시간과 종료시간을 ,로 구분하여 기입해주세요\n시작시간과 종료시간은 ~ 로 표기해주세요 \n 예시) 10:00 ~ 12:00,`,
      lessonFee: "수업료",
      worker: "담당 직원 이름을 정확하게 기입해주세요",
      startDate: "시작일자를 8자리로 기입해주세요",
    },
    {
      name: "한상훈",
      phone: "01030252195",
      birth: "19950517",
      job: "개발자",
      dayOfWeek: "월요일, 화요일",
      times: "10:00 ~ 10:20, 09:00 ~ 09:20",
      lessonFee: "250000",
      worker: "직원1",
      startDate: "20240405",
    },
  ];
  return (
    <Button
      text={"명단 출력"}
      className="py-3 hidden lg:block"
      isButtonDisabled={members.length === 0}
      onClick={() => {
        downloadMemberList({
          title: `회원 명단 출력`,
          header,
          total,
          content,
        });
      }}
    />
  );
};

export default DownloadMemberListBtn;
