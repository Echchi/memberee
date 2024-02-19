import React from "react";
import Input from "@/component/input";
import { format } from "date-fns";
import { formatCurrency } from "@/libs/client/utils";
import Button from "@/component/button";

const PayCheck = () => {
  const today = format(new Date(), "yyyy. MM. dd");
  return (
    <>
      <Input
        type={"text"}
        label={"납부일자"}
        placeholder={today}
        className="h-14 lg:text-lg border-b-0 rounded-t-lg"
      />
      <Input
        type={"select"}
        label={"납부방법"}
        options={["계좌이체", "신용카드", "현금", "기타"]}
        className="h-14 lg:text-lg border-b-0"
      />
      <Input
        type={"text"}
        label={"납부금액"}
        placeholder={formatCurrency("250000")}
        className="h-14 lg:text-lg border-b-0"
      />
      <Input
        type={"text"}
        label={"메모"}
        placeholder={"국민은행 000-000-00-000000"}
        className="h-14 lg:text-lg rounded-b-lg"
      />
      <Button text={"등록"} className="mt-4" large={true} />
    </>
  );
};

export default PayCheck;
