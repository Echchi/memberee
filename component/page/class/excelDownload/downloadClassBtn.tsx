"use client";
import React from "react";
import Button from "../../../button/button";

import { downloadClass } from "./downloadClass";
import { Schedule } from "@prisma/client";
const DownloadClassBtn = ({
  content,
  worker,
  sub,
}: {
  content: Schedule[];
  worker: string;
  sub: string;
}) => {
  const header = [
    { header: "", key: "time" },
    { header: "월", key: "mon" },
    { header: "화", key: "tue" },
    { header: "수", key: "wed" },
    { header: "목", key: "thu" },
    { header: "금", key: "fri" },
    { header: "토", key: "sat" },
    { header: "일", key: "sun" },
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
      className="py-3 hidden xl:block"
      isButtonDisabled={content?.length === 0}
      onClick={() => {
        downloadClass({
          title: `${worker} 시간표`,
          sub: sub,
          header,
          content,
        });
      }}
    />
  );
};

export default DownloadClassBtn;
