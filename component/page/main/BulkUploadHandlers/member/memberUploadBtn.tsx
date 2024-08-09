"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Button from "../../../../button/button";

import {
  formatDayOfWeekForDatabase,
  getWorkerId,
} from "../../../../../libs/client/utils";
import { createMember } from "../../../../../app/(tabBar)/member/register/action";
import { ITime } from "../../../member/register/selectTime";
import { PaymentType } from "../../../../../libs/constants";
import { getPaymentType } from "../../../../../app/(tabBar)/main/api";

const MemberUploadBtn = ({
  listData,
  setErrors,
  errors,
  setIsLoading,
  onClose,
  setProgress,
  isLoading,
}: {
  listData: string[][];
  setErrors: Dispatch<SetStateAction<number[]>>;
  errors: number[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}) => {
  console.log("listData", listData);
  const [paymentType, setPaymentType] = useState<PaymentType>();
  useEffect(() => {
    const fetchPaymentType = async () => {
      const type = await getPaymentType();
      setPaymentType(type);
    };
    fetchPaymentType();
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      for (let i = 0; i < listData.length; i++) {
        const data = listData[i];
        const dayOfWeekData = formatDayOfWeekForDatabase(data[4]);
        const workerId = await getWorkerId(data[7]);

        const dayOfWeekArr = dayOfWeekData
          .trim()
          .replace(/\s+/g, "")
          .split("")
          .filter((item) => item.length > 0);
        const timesArr = data[5]
          .trim()
          .replace(/\s+/g, "")
          .split(",")
          .filter((item) => item.length > 0);

        let times: ITime = {};

        dayOfWeekArr.forEach((day, index) => {
          const timeArr = timesArr[index].split("~");
          times[Number(day)] = {
            startTime: timeArr[0].trim(),
            endTime: timeArr[1].trim(),
          };
        });

        const formData = new FormData();
        formData.append("name", data[0]);
        formData.append("phone", data[1]);
        formData.append("birth", data[2]);
        formData.append("job", data[3]);
        formData.append("dayOfWeek", dayOfWeekData);
        formData.append("times", JSON.stringify(times));
        formData.append("lessonFee", data[6]);
        formData.append("worker", workerId);
        formData.append("startDate", data[8]);
        paymentType === PaymentType.DIFFERENT
          ? formData.append("payDay", data[9])
          : null;

        const response = await createMember(true, null, formData);
        // console.log("response", response);
        setProgress(((i + 1) / listData.length) * 100);
      }
    } catch (error) {
      setErrors((prev) => [...prev, -1]);
    }
    setIsLoading(false);
    onClose();
    location.reload();
  }, [listData, errors]);

  return (
    <Button
      text={"등록"}
      className="py-3 hidden xl:block !w-1/6"
      isButtonDisabled={errors.length > 0 || isLoading}
      onClick={handleSubmit}
    />
  );
};

export default MemberUploadBtn;
