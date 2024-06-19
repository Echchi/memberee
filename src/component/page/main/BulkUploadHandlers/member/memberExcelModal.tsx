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
  MONEY_REGEX,
  ONLY_NUMBER_REGEX,
  STARTDATE_REGEX,
  TIMEDATA_REGEX,
} from "@/libs/constants";
import WorkersUploadBtn from "@/component/page/main/BulkUploadHandlers/worker/workersUploadBtn";
import MemberUploadBtn from "@/component/page/main/BulkUploadHandlers/member/memberUploadBtn";
import RegisterMembers from "@/component/page/main/BulkUploadHandlers/member/registerMembers";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";
import BulkLoading from "@/component/excel/builkUpload/bulkLoading";

const MemberExcelModal = ({ onClose }: { onClose: () => void }) => {
  const [selecetdFile, setSelectedFile] = useState<string>();
  const [listData, setListData] = useState<string[][]>([]);
  const [errors, setErrors] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [workers, setWorkers] = useState<string[]>([]);
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
  };

  useEffect(() => {
    const fetchWorkerList = async () => {
      const workerList = await getWorkerList();
      const workersData = workerList.map((item) => item.name);
      setWorkers(workersData);
    };

    fetchWorkerList();
    try {
      const errorIndexes = listData.reduce((acc: number[], items, idx) => {
        const validations = [
          validator.isMobilePhone(items[1] + "", "ko-KR"), // 연락처
          BIRTH_REGEX.test(items[2] + ""), // 생년월일
          // 요일과 시간 길이
          items[4]
            ?.split(",")
            .map((day) => day.trim().replace(/\s+/g, ""))
            .filter((item) => item.length > 0).length ===
            items[5]
              .split(",")
              .map((time) => time.trim().replace(/\s+/g, ""))
              .filter((item) => item.length > 0).length,

          scheduleValid(items[4], "dayOfWeek"),
          scheduleValid(items[5], "time"),

          MONEY_REGEX.test(items[6]), // 수업료

          workers.includes(items[7]), // 담당
          STARTDATE_REGEX.test(items[8] + ""), // 시작일자
        ];

        const hasError = validations.some((validation) => !validation);
        if (hasError) acc.push(idx);
        return acc;
      }, []);

      if (errorIndexes.length > 0) {
        setErrors(errorIndexes);
      }
    } catch (e) {
      setErrors((prev) => [...prev, -1]);
    }
  }, [listData]);

  return (
    <div className="w-full relative">
      {isLoading ? (
        <BulkLoading progress={progress} />
      ) : (
        <>
          <div className="h-20 flex justify-between space-x-3 py-3 w-full">
            <div className="flex w-1/2">
              <label className="w-32 stone_btn font-semibold text-center flex justify-center items-center px-3 py-2 cursor-pointer">
                파일 선택
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
            <div className="w-1/6">
              <RegisterMembers />
            </div>
          </div>
          <div className="h-[500px] my-3 overflow-scroll ">
            <table className="w-full table-auto text-center border-stone-100">
              <thead className="*:text-lg font-semibold bg-stone-100 h-16 sticky top-0">
                <tr>
                  <td>이름</td>
                  <td>연락처</td>
                  <td>생년월일</td>
                  <td>직업</td>
                  <td>요일</td>
                  <td>시간</td>
                  <td>수업료</td>
                  <td>담당</td>
                  <td>시작일자</td>
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
                        <td key={`register_worker_${idx}-${index}`}>{item}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <p
              className={cls(
                "flex justify-center items-center font-semibold text-xl",
                errors.length > 0 ? "text-orange-500" : "text-emerald-700",
              )}
            >
              {errors.length > 0
                ? errors[0] === -1
                  ? "양식을 확인해주세요"
                  : `${errors.length}개의 데이터를 확인해주세요`
                : `총 ${listData.length} 명`}
            </p>

            <MemberUploadBtn
              listData={listData}
              errors={errors}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onClose={onClose}
              setProgress={setProgress}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MemberExcelModal;
