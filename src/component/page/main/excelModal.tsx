import React, { useState } from "react";
import RegisterBtn from "@/component/page/member/registerBtn";
import Button from "@/component/button/button";
import Input from "@/component/input";
import RegisterWorkers from "@/component/excel/registerWorkers";

const ExcelModal = () => {
  const [selecetdFile, setSelectedFile] = useState<string>();
  const handleFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event", event.target.value);
  };
  return (
    <div className="w-full">
      <div className="h-20 flex justify-between space-x-3 py-3 w-full  ">
        <div className="flex w-1/2">
          <label className="w-32 stone_btn font-semibold text-center flex justify-center items-center px-3 py-2 cursor-pointer">
            파일 선택
            <input
              type="file"
              className="hidden"
              onChange={(event) => handleFileOnChange(event)}
            />
          </label>

          <Input type="div" value={selecetdFile} className="rounded-r-lg" />
        </div>
        <div className="w-1/6">
          <RegisterWorkers />
        </div>
      </div>

      <table className="w-full table-auto text-center border-stone-100">
        <thead className="*:text-lg font-semibold bg-stone-100 h-10">
          <tr>
            <td>이름</td>
            <td>연락처</td>
            <td>생년월일</td>
            <td>시작일자</td>
            <td>근무일</td>
            <td>수수료</td>
            <td>은행</td>
            <td>계좌번호</td>
          </tr>
        </thead>
        <tbody className="*:h-10">
          <tr>
            <td>이름 값</td>
            <td>연락처 값</td>
            <td>생년월일 값</td>
            <td>시작일자 값</td>
            <td>근무일 값</td>
            <td>수수료 값</td>
            <td>은행 값</td>
            <td>계좌번호 값</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button text={"등록"} className="py-3 hidden lg:block !w-1/6" />
      </div>
    </div>
  );
};

export default ExcelModal;
