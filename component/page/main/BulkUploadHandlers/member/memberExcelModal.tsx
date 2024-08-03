import React, { useEffect, useState } from "react";
import RegisterBtn from "../../../member/registerBtn";
import Button from "../../../../button/button";
import Input from "../../../../input";
import RegisterWorkers from "../worker/registerWorkers";
import { readXlsx } from "../../../../../libs/client/readXlsx";
import validator from "validator";
import { cls, scheduleValid } from "../../../../../libs/client/utils";
import {
  BIRTH_REGEX,
  COMMISSION_REGEX,
  DATE_REGEX,
  DAYOFWEEK_REGEX,
  MONEY_REGEX,
  NAME_REGEX,
  ONLY_NUMBER_REGEX,
  STARTDATE_REGEX,
  TIMEDATA_REGEX,
} from "../../../../../libs/regex";
import WorkersUploadBtn from "../worker/workersUploadBtn";
import MemberUploadBtn from "./memberUploadBtn";
import RegisterMembers from "./registerMembers";
import { getWorkerList } from "../../../../../app/(tabBar)/worker/register/api";
import BulkLoading from "../../../../excel/builkUpload/bulkLoading";
import { useRecoilValue } from "recoil";
import { paymentState } from "../../../../../libs/client/recoil/store/atoms";
import { PaymentType } from "../../../../../libs/constants";
import WorkerList from "../../../member/register/workerList";

const MemberExcelModal = ({ onClose }: { onClose: () => void }) => {
  const paymentType = useRecoilValue(paymentState);
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
          console.log("data", data);
          setListData(data);
        })
        .catch((error) => {
          console.error("Error reading file: ", error);
        });
      event.target.value = "";
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
          NAME_REGEX.test(items[0]),
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
          paymentType === PaymentType.DIFFERENT
            ? DATE_REGEX.test(items[9])
            : null,
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
                <RegisterMembers />
              </div>
            )}
          </div>
          <div className="h-[495px] my-3 overflow-scroll ">
            {listData.length > 0 && selecetdFile ? (
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
                    {paymentType === PaymentType.DIFFERENT ? (
                      <td>납부일자</td>
                    ) : null}
                  </tr>
                </thead>

                <tbody className="*:h-10">
                  {listData?.map((items: string[], idx) => (
                    <tr
                      key={`register_workers_${idx}`}
                      className={cls(
                        "border border-stone-100 border-x-0 border-t-0 border-b",
                        errors && errors.includes(idx)
                          ? "bg-orange-200 text-orange-500"
                          : "",
                      )}
                    >
                      {items.map(
                        (item: string, index) => {
                          // if (index === 7) {
                          //   return (
                          //     <WorkerList
                          //       isOnly={true}
                          //       key={`workerList_{index}`}
                          //     />
                          //   );
                          // } else {

                          return (
                            <td key={`register_member_${idx}-${index}`}>
                              {item}
                            </td>
                          );
                        },
                        // }
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-sm xl:text-lg xl:space-y-2 space-y-1">
                <p>
                  양식을 다운로드하시고,
                  <span className="text-red-600"> 빨간 글씨</span>에 맞게 회원
                  정보를 입력해주세요
                </p>
                <p>
                  그 다음, 왼쪽 위에 파일을 등록해주시면 등록을 도와드릴게요!
                </p>
                <div className="w-1/2 xl:w-1/4 pt-3">
                  <RegisterMembers />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <p
              className={cls(
                "flex justify-center items-center font-semibold text-xl",
                errors.length > 0 ? "text-orange-500" : "text-emerald-700",
              )}
            >
              {listData.length > 0 &&
                selecetdFile &&
                (errors.length > 0
                  ? errors[0] === -1
                    ? "양식을 확인해주세요"
                    : errors[0] === -2
                      ? "잠시 뒤에 다시 시도해주세요"
                      : `${errors.length}개의 데이터를 확인해주세요`
                  : `총 ${listData.length} 명`)}
            </p>
            {listData.length > 0 && selecetdFile && (
              <MemberUploadBtn
                listData={listData}
                setErrors={setErrors}
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

export default MemberExcelModal;
