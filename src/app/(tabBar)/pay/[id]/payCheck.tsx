import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { format } from "date-fns";
import {
  cls,
  dateFormattedtoKor,
  dateFormattedtoNum,
  formatCurrency,
} from "@/libs/client/utils";
import Button from "@/component/button/button";
import { IPay } from "@/component/page/pay/[id]/list";
import {
  MONEY_REGEX,
  MONEY_REGEX_ERROR,
  PAYDATE_REGEX,
  PAYDATE_REGEX_ERROR,
  PAYMENT_METHOD,
} from "@/libs/constants";
import { createPay, deletePay, updatePay } from "@/app/(tabBar)/pay/[id]/api";

const PayCheck = ({ param }: { param: IPay | null }) => {
  // console.log("PayCheck param", param);
  const today = format(new Date(), "yyyy. MM. dd");
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({
    paymentDate: "",
    lessonFee: "",
  });
  const [data, setData] = useState({
    id: Number(param?.id),
    memberId: Number(param?.memberId),
    forYear: Number(param?.year),
    forMonth: Number(param?.month),
    paymentDate: dateFormattedtoNum(param?.paymentDate),
    lessonFee: Number(param?.lessonFee),
    paymentMethod: param?.method || null,
    memo: param?.memo + "" || "",
  });

  const handleChangePaymentDate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        paymentDate: "",
      }));
    }
    if (!PAYDATE_REGEX.test(value)) {
      setError((prev) => ({
        ...prev,
        paymentDate: PAYDATE_REGEX_ERROR,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        paymentDate: value,
      }));
    }
  };
  const handleChangeLessonFee = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    if (value.length > 0) {
      setError((prev) => ({
        ...prev,
        lessonFee: "",
      }));
    }
    if (!MONEY_REGEX.test(value)) {
      setError((prev) => ({
        ...prev,
        lessonFee: MONEY_REGEX_ERROR,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        lessonFee: Number(value),
      }));
    }
  };
  const handleChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setData((prev) => ({
      ...prev,
      memo: value,
    }));
  };

  return (
    <>
      <Input
        type={isEdit ? "text" : "div"}
        label={"납부일자"}
        placeholder={dateFormattedtoNum(param?.paymentDate)}
        value={
          isEdit
            ? dateFormattedtoNum(param?.paymentDate)
            : dateFormattedtoKor(param?.paymentDate)
        }
        className="h-16 lg:text-lg border-b-0 rounded-t-lg"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangePaymentDate(event)
        }
        maxLength={8}
        minLength={8}
        required={true}
        errorMessage={[error?.paymentDate]}
      />
      <Input
        type={isEdit ? "select" : "div"}
        label={"납부방법"}
        options={PAYMENT_METHOD}
        value={param?.method || "기타"}
        className="h-16 lg:text-lg border-b-0"
        onSelectChange={(event) => {
          // console.log("납부방법 event.target.value", event.target.value);
          setData((prev) => ({ ...prev, paymentMethod: event.target.value }));
        }}
      />
      <Input
        type={isEdit ? "text" : "div"}
        label={"납부금액"}
        placeholder={formatCurrency(param?.lessonFee)}
        value={isEdit ? param?.lessonFee : formatCurrency(param?.lessonFee)}
        className="h-16 lg:text-lg border-b-0"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeLessonFee(event)
        }
        maxLength={7}
        minLength={4}
        required={true}
        errorMessage={[error?.lessonFee]}
      />
      <Input
        type={isEdit ? "text" : "div"}
        label={"메모"}
        placeholder={param?.memo}
        value={param?.memo ? param.memo : isEdit ? "" : "-"}
        className="h-16 lg:text-lg rounded-b-lg"
        maxLength={100}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeMemo(event)
        }
      />
      <div className="flex justify-between *:w-1/6">
        {isEdit ? (
          <Button
            text={"취소"}
            className="mt-4 !bg-gray-400/80 hover:!bg-gray-400/50 active:!bg-gray-400 !w1/6"
            large={true}
            onClick={() => setIsEdit(false)}
          />
        ) : (
          <Button
            type={"button"}
            text={"미납처리"}
            className="mt-4 red_btn"
            large={true}
            onClick={() => deletePay(data)}
          />
        )}

        <Button
          type={"button"}
          text={isEdit ? "확인" : "수정"}
          className="mt-4"
          large={true}
          onClick={isEdit ? () => updatePay(data) : () => setIsEdit(true)}
        />
      </div>
    </>
  );
};

export default PayCheck;
