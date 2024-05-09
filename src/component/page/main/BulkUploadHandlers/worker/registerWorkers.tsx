import React from "react";
import Button from "@/component/button/button";
import { CSVLink, CSVDownload } from "react-csv";
import { onClickXLSX } from "@/component/excel/onClickXLSX";
const RegisterWorkers = () => {
  const header = [
    { header: "이름", key: "name" },
    { header: "연락처", key: "phone" },
    { header: "생년월일", key: "birth" },
    { header: "시작일자", key: "startDate" },
    { header: "근무일", key: "dayOfWeek" },
    { header: "수수료", key: "commission" },
    { header: "은행", key: "bank" },
    { header: "계좌번호", key: "accountNumber" },
  ];

  const content = [
    {
      name: "예시",
      phone: "숫자로만 기입해주세요",
      birth: "생년월일 여덟글자",
      startDate: "시작일자 여덟글자",
      dayOfWeek: ",로 구분",
      commission: "숫자로만 기입해주세요",
      bank: "은행명",
      accountNumber: "숫자로만 기입해주세요",
    },
    {
      name: "한상훈",
      phone: "01030252195",
      birth: "19950517",
      startDate: "20240405",
      dayOfWeek: "월요일, 화요일",
      commission: "10",
      bank: "농협",
      accountNumber: "3020796259991",
    },
  ];

  return (
    <>
      <Button
        text="양식 다운"
        className="mt-0 py-3 !bg-emerald-500 hover:!bg-emerald-500/80 active:!bg-emerald-600"
        onClick={() =>
          onClickXLSX({ title: "직원 등록 양식", header, content })
        }
      />
    </>
  );
};

export default RegisterWorkers;
