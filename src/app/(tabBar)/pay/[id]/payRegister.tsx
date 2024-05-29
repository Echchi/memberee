import React, { useEffect, useState } from "react";
import Input from "@/component/input";
import { format } from "date-fns";
import Button from "@/component/button/button";
import { IPay } from "@/component/page/pay/[id]/list";
import {
  MONEY_REGEX,
  MONEY_REGEX_ERROR,
  PAYDATE_REGEX,
  PAYDATE_REGEX_ERROR,
  PAYMENT_METHOD,
} from "@/libs/constants";
import { createPay } from "@/app/(tabBar)/pay/[id]/api";

const PayRegister = ({
  param,
  lessonFee,
}: {
  param: IPay | null;
  lessonFee: number;
}) => {
  console.log(lessonFee);
  const today = format(new Date(), "yyyyMMdd");
  const [error, setError] = useState({
    paymentDate: "",
    lessonFee: "",
  });
  const [data, setData] = useState({
    memberId: param?.memberId || -1,
    workerId: param?.workerId || -1,
    forYear: Number(param?.year),
    forMonth: Number(param?.month),
    paymentDate: today,
    lessonFee: lessonFee,
    paymentMethod: "기타",
    memo: "",
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
  useEffect(() => {
    console.log("Member data", data);
  }, [data]);
  return (
    <>
      <Input
        type={"text"}
        label={"납부일자"}
        placeholder={today}
        value={data.paymentDate}
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
        type={"select"}
        label={"납부방법"}
        options={PAYMENT_METHOD}
        className="h-16 lg:text-lg border-b-0"
        onSelectChange={(event) => {
          console.log("납부방법 event.target.value", event.target.value);
          setData((prev) => ({ ...prev, paymentMethod: event.target.value }));
        }}
      />
      <Input
        type={"text"}
        label={"납부금액"}
        placeholder={param?.lessonFee}
        value={lessonFee + ""}
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
        type={"text"}
        label={"메모"}
        placeholder={"국민은행 000-000-00-000000"}
        className="h-16 lg:text-lg rounded-b-lg"
        maxLength={100}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeMemo(event)
        }
      />
      <Button
        text={"등록"}
        className="mt-4"
        large={true}
        isButtonDisabled={Object.values(error).some(
          (value) => value.length > 0,
        )}
        onClick={() => createPay(data)}
      />
    </>
  );
};

export default PayRegister;
