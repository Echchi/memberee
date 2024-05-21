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
import { downloadPayList } from "@/component/page/pay/excelDownload/downloadPayList";
import { getPaidCnt } from "@/app/(tabBar)/main/api";
import { getMember } from "@/app/(tabBar)/member/[id]/api";
import { Payment } from ".prisma/client";

const DownloadPayDetailBtn = ({ id }: { id: string }) => {
  const header = [
    { header: "이름", key: "name" },
    { header: "연락처", key: "phone" },
    { header: "담당", key: "worker" },
    { header: "수강료", key: "lessonFee" },
    { header: "납부여부", key: "payment" },
    { header: "상태", key: "status" },
  ];

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
      text={"출력"}
      className="py-3 hidden lg:block"
      // isButtonDisabled={members.length === 0}
      // onClick={() => {
      //   downloadPayList({
      //     title: `납부 내역 출력_${year}년 ${month}월`,
      //     total,
      //     paid,
      //     header,
      //     content,
      //   });
      // }}
    />
  );
};

export default DownloadPayDetailBtn;
