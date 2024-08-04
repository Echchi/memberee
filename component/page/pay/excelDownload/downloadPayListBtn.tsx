"use client";
import React, { useEffect, useState } from "react";
import Button from "../../../button/button";

import { getMembers } from "../../../../app/(tabBar)/member/api";

import { IMemberWithSchedules } from "../../../../app/(tabBar)/member/[id]/page";
import {
  cls,
  formatCurrency,
  formatPhone,
} from "../../../../libs/client/utils";

import { downloadPayList } from "./downloadPayList";
import { getPaidCnt } from "../../../../app/(tabBar)/main/api";
import { PaymentType } from "@prisma/client";

const DownloadPayListBtn = ({
  year,
  month,
  paymentType,
}: {
  year: number;
  month: number;
  paymentType: PaymentType;
}) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<IMemberWithSchedules[]>([]);
  const [total, setTotal] = useState<number>();
  const [paid, setPaid] = useState<number>();
  const [clicked, setClicked] = useState(false);
  const fetchMembers = async () => {
    try {
      const response = await getMembers({
        params: {
          query: "",
          year,
          month,
          payStatus: 0,
          isAll: true,
        },
      });

      if (response) {
        setMembers(response.members);
        setTotal(response.total);
      }
    } catch (e) {
      return new Error("error fetch members");
    }
  };

  const fetchPaidCnt = async () => {
    try {
      const response = await getPaidCnt(year, month);
      if (response) {
        console.log("paid", response);
        setPaid(response);
      }
    } catch (e) {
      return new Error("error fetch paidCnt");
    }
  };

  useEffect(() => {
    const handleDownload = async () => {
      if (clicked) {
        setLoading(true);
        await fetchMembers();
        await fetchPaidCnt();
        setLoading(false);
      }
    };
    handleDownload();
  }, [clicked, year, month]);

  const header = [
    { header: "이름", key: "name" },
    { header: "연락처", key: "phone" },
    { header: "담당", key: "worker" },
    { header: "수강료", key: "lessonFee" },
    { header: "납부여부", key: "payment" },
    { header: "상태", key: "status" },
  ];

  if (paymentType === PaymentType.DIFFERENT) {
    const index = header.findIndex((item) => item.key === "payment");
    header.splice(index + 1, 0, { header: "납부일", key: "payDay" });
  }

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

  useEffect(() => {
    console.log(!loading, members.length > 0);
    if (!loading && members.length > 0) {
      const content = members.map((member) => {
        const payment =
          member.status === 0 && member.endDate
            ? ""
            : member.status < 0 ||
                (member?.Payment &&
                  member?.Payment[0] &&
                  member?.Payment[0]?.lessonFee &&
                  member?.Payment[0]?.lessonFee < 0)
              ? "-"
              : member?.Payment && member?.Payment?.length > 0
                ? "납부"
                : "미납";
        return {
          name: member.name,
          phone: formatPhone(member.phone),
          worker: member.worker?.name,
          lessonFee:
            formatCurrency(
              (member.Schedule && member.Schedule[0]?.lessonFee) || "",
            ) || "-",
          ...(paymentType === PaymentType.DIFFERENT
            ? { payDay: member.payDay + " 일" }
            : {}),
          payment: payment,
          status:
            member.status < 0 ? "중단" : member.status === 0 ? "탈퇴" : "",
        };
      });
      downloadPayList({
        title: `${year}년 ${month}월 납부 명단`,
        total,
        paid,
        header,
        content,
        paymentType,
      });
      setClicked(false);
    }
  }, [loading, total, paid, members, year, month]);

  const handleOnClick = () => {
    if (!loading) {
      setClicked(true);
    }
  };

  return (
    <Button
      text={loading ? "로딩중" : "출력"}
      className={cls("py-3 hidden xl:block")}
      isButtonDisabled={loading}
      onClick={handleOnClick}
    />
  );
};

export default DownloadPayListBtn;
