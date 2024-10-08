import React, { useEffect, useState } from "react";
import Button from "../../../../button/button";
import { onClickUploadXLSX } from "../../../../excel/builkUpload/onClickUploadXLSX";
import { PaymentType } from ".prisma/client";
import { getPaymentType } from "../../../../../app/(tabBar)/main/api";

const RegisterMembers = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>();
  useEffect(() => {
    const fetchPaymentType = async () => {
      const type = await getPaymentType();
      setPaymentType(type);
    };
    fetchPaymentType();
  }, []);

  const header = [
    { header: "이름", key: "name" },
    { header: "연락처", key: "phone" },
    { header: "생년월일", key: "birth" },
    { header: "직업", key: "job" },
    { header: "요일", key: "dayOfWeek" },
    { header: "시간", key: "times" },
    { header: "수업료", key: "lessonFee" },
    { header: "담당", key: "worker" },
    { header: "시작일자", key: "startDate" },
    paymentType === PaymentType.DIFFERENT
      ? { header: "납부일자", key: "payDay" }
      : {},
  ];

  const content = [
    {
      name: "예시",
      phone: "숫자로만 입력해주세요",
      birth: "생년월일를 8자리로 기입해주세요",
      job: "직업",
      dayOfWeek: ",로 구분",
      times: `요일 별 순서대로 시작시간과 종료시간을 ,로 구분하여 입력해주세요\n시작시간과 종료시간은 ~ 로 표기해주세요 \n 예시) 10:00 ~ 12:00,`,
      lessonFee: "수업료",
      worker: "담당 직원 이름을 정확하게 입력해주세요",
      startDate: "시작일자를 8자리로 입력해주세요",
      ...(paymentType === PaymentType.DIFFERENT
        ? { payDay: "숫자로만 입력해주세요" }
        : {}),
    },
    {
      name: "이멤버 (예시)",
      phone: "01012341234",
      birth: "19950517",
      job: "직장인",
      dayOfWeek: "월요일, 화요일",
      times: "10:00 ~ 10:20, 09:00 ~ 09:20",
      lessonFee: "250000",
      worker: "김직원",
      startDate: "20240405",
      ...(paymentType === PaymentType.DIFFERENT ? { payDay: 5 } : {}),
    },
  ];

  return (
    <>
      <Button
        text="양식 다운"
        className="mt-0 py-3 !bg-emerald-500 hover:!bg-emerald-500/80 active:!bg-emerald-600"
        onClick={() =>
          onClickUploadXLSX({
            title: "회원 등록 양식",
            header,
            content,
            isMember: true,
            paymentType: paymentType || PaymentType.DIFFERENT,
          })
        }
      />
    </>
  );
};

export default RegisterMembers;
