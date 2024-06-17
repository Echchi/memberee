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
import { Member } from "@prisma/client";
import { IPay } from "@/component/page/pay/[id]/list";
import { downloadPayDetail } from "@/component/page/pay/[id]/excelDownload/downloadPayDetail";

const DownloadPayDetailBtn = ({
  member,
  listItem,
  record,
}: {
  member: IMemberWithSchedules | null;
  listItem: IPay[];
  record: string;
}) => {
  const header = [
    { header: "연도", key: "year" },
    { header: "월", key: "month" },
    { header: "납부방법", key: "method" },
    { header: "금액", key: "lessonFee" },
    { header: "납부일자", key: "paymentDate" },
  ];

  const memberData = {
    name: member?.name,
    worker: member?.worker?.name,
    phone: formatPhone(member?.phone || ""),
    record: record,
  };

  const content = listItem.map((item) => ({
    year: item.year,
    month: item.month,
    method: item.method || "-",
    lessonFee: item.lessonFee || "-",
    paymentDate: item.paymentDate
      ? format(item.paymentDate || "", "yyyy년 MM월 dd일")
      : "-",
  }));
  return (
    <Button
      text={"출력"}
      className="py-3 hidden xl:block"
      isButtonDisabled={!member}
      onClick={() => {
        downloadPayDetail({
          title: `${member?.name} 납부 내역`,
          memberData,
          header,
          content,
        });
      }}
    />
  );
};

export default DownloadPayDetailBtn;
