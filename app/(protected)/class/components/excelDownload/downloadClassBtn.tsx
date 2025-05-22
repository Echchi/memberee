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
