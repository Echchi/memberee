import React, { useCallback, useEffect, useState } from "react";
import Button from "@/component/button/button";
import { createWorker } from "@/app/(tabBar)/worker/register/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import getSession from "@/libs/client/session";
import { formatDayOfWeekForDatabase, getWorkerId } from "@/libs/client/utils";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";
import { getWorkers } from "@/component/page/worker/workers";
import { createMember } from "@/app/(tabBar)/member/register/action";
import { forEachEntryModule } from "next/dist/build/webpack/utils";
import { ITime } from "@/component/page/member/register/selectTime";

const MemberUploadBtn = ({
  listData,
  errors,
  isLoading,
  setIsLoading,
  onClose,
  setProgress,
}: {
  listData: string[][];
  errors: number[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const [workers, setWorkers] = useState<string[]>([]);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
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

      const response = await createMember(true, null, formData);
      setProgress(((i + 1) / listData.length) * 100);
    }
    setIsLoading(false);
    onClose();
    router.refresh();
  }, [listData, errors]);

  return (
    <Button
      text={"등록"}
      className="py-3 hidden xl:block !w-1/6"
      isButtonDisabled={errors.length > 0}
      onClick={handleSubmit}
    />
  );
};

export default MemberUploadBtn;
