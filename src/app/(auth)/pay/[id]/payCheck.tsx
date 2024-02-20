import React, { useState } from "react";
import Input from "@/component/input";
import { format } from "date-fns";
import { cls, formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button";

const PayCheck = () => {
  const today = format(new Date(), "yyyy. MM. dd");
  const [mode, setMode] = useState("div");
  return (
    <>
      <Input
        type={mode}
        label={"납부일자"}
        placeholder={today}
        value={today}
        className="h-14 lg:text-lg border-b-0 rounded-t-lg"
      />
      <Input
        type={mode === "text" ? "select" : mode}
        label={"납부방법"}
        options={["계좌이체", "신용카드", "현금", "기타"]}
        value={"계좌이체"}
        className="h-14 lg:text-lg border-b-0"
      />
      <Input
        type={mode}
        label={"납부금액"}
        placeholder={formatCurrency("250000")}
        value={formatCurrency("250000")}
        className="h-14 lg:text-lg border-b-0"
      />
      <Input
        type={mode}
        label={"메모"}
        placeholder={"국민은행 000-000-00-000000"}
        value={"국민은행 000-000-00-000000"}
        className="h-14 lg:text-lg rounded-b-lg"
      />
      <div className="md:flex justify-between *:md:w-1/6">
        <div className={cls(mode === "text" ? "block" : "invisible")}>
          <Button
            text={"취소"}
            className="mt-4 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400"
            large={true}
            onClick={() => setMode("div")}
          />
        </div>
        <div>
          <Button
            type={mode === "text" ? "submit" : "button"}
            text={mode === "text" ? "확인" : "수정"}
            className="mt-4"
            large={true}
            onClick={() => setMode("text")}
          />
        </div>
      </div>
    </>
  );
};

export default PayCheck;
