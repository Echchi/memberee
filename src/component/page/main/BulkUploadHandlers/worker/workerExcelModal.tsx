import React, { useEffect, useState } from "react";
import RegisterBtn from "@/component/page/member/registerBtn";
import Button from "@/component/button/button";
import Input from "@/component/input";
import RegisterWorkers from "@/component/page/main/BulkUploadHandlers/worker/registerWorkers";
import { readXlsx } from "@/libs/client/readXlsx";
import validator from "validator";
import { cls, scheduleValid } from "@/libs/client/utils";
import {
  BIRTH_REGEX,
  COMMISSION_REGEX,
  DAYOFWEEK_REGEX,
  ONLY_NUMBER_REGEX,
  STARTDATE_REGEX,
} from "@/libs/regex";
import WorkersUploadBtn from "@/component/page/main/BulkUploadHandlers/worker/workersUploadBtn";
import ProgressBar from "@/component/progressbar";
import BulkLoading from "@/component/excel/builkUpload/bulkLoading";

const WorkerExcelModal = ({ onClose }: { onClose: () => void }) => {
  const [selecetdFile, setSelectedFile] = useState<string>();
  const [listData, setListData] = useState<string[][]>([]);
  const [errors, setErrors] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file.name);
      readXlsx(file)
        .then((data) => {
          setListData(data);
        })
        .catch((error) => {
          console.error("Error reading file: ", error);
        });
    }
    event.target.value = "";
  };

  useEffect(() => {
    try {
      const errorIndexes = listData.reduce((acc: number[], items, idx) => {
        const validations = [
          validator.isMobilePhone(items[1] + "", "ko-KR"),
          BIRTH_REGEX.test(items[2] + ""),
          STARTDATE_REGEX.test(items[3] + ""),
          scheduleValid(items[4], "dayOfWeek"),

          COMMISSION_REGEX.test(items[5]),
          ONLY_NUMBER_REGEX.test(items[7]),
        ];

        const hasError = validations.some((validation) => !validation);
        if (hasError) acc.push(idx);
        return acc;
      }, []);

      if (errorIndexes.length > 0) {
        setErrors(errorIndexes);
      }
    } catch (e) {
      setErrors((prev) => [...prev, 0]);
    }
  }, [listData]);

  return (
    <div className="w-full relative">
      {isLoading ? (
        <BulkLoading progress={progress} />
      ) : (
        <>
          <div className="h-20 flex justify-between space-x-3 py-3 w-full">
            <div className="flex w-full xl:w-1/2">
              <label className="w-32 stone_btn font-semibold text-center flex justify-center items-center px-3 py-2 cursor-pointer">
                파일 등록
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => handleFileOnChange(event)}
                />
              </label>

              <Input
                type="div"
                value={selecetdFile}
                className="rounded-r-lg px-3"
              />
            </div>
            {listData.length > 0 && selecetdFile && (
              <div className="w-1/6">
                <RegisterWorkers />
              </div>
            )}
          </div>
          <div className="h-[495px] my-3 overflow-y-scroll">
            {listData.length > 0 && selecetdFile ? (
              <table className="w-full table-auto text-center border-stone-100">
                <thead className="*:text-lg font-semibold bg-stone-100 h-16 sticky top-0">
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
                  {listData &&
                    listData?.map((items: string[], idx) => (
                      <tr
                        key={`register_workers_${idx}`}
                        className={cls(
                          "border border-stone-100 border-x-0 border-t-0 border-b",
                          errors && errors.includes(idx)
                            ? "bg-orange-200 text-orange-500"
                            : "",
                        )}
                      >
                        {items.map((item: string, index) => (
                          <td key={`register_worker_${idx}-${index}`}>
                            {item}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-sm xl:text-lg xl:space-y-2 space-y-1">
                <p>
                  양식을 다운로드하시고,
                  <span className="text-red-600"> 빨간 글씨</span>에 맞게 직원
                  정보를 입력해주세요
                </p>
                <p>
                  그 다음, 왼쪽 위에 파일을 등록해주시면 등록을 도와드릴게요!
                </p>
                <div className="w-1/2 xl:w-1/4 pt-3">
                  <RegisterWorkers />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between pb-3">
            <p
              className={cls(
                "flex justify-center items-center font-semibold text-xl",
                errors.length > 0 ? "text-orange-500" : "text-emerald-700",
              )}
            >
              {listData.length > 0 &&
                selecetdFile &&
                (errors.length > 0
                  ? `${errors.length}개의 데이터가 잘못되어있어요`
                  : `총 ${listData.length} 명`)}
            </p>
            {listData.length > 0 && selecetdFile && (
              <WorkersUploadBtn
                listData={listData}
                errors={errors}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onClose={onClose}
                setProgress={setProgress}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkerExcelModal;
