import React, { useCallback, useState } from "react";
import Button from "@/component/button/button";
import { createWorker } from "@/app/(tabBar)/worker/register/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import getSession from "@/libs/client/session";
import { formatDayOfWeekForDatabase } from "@/libs/client/utils";

const WorkersUploadBtn = ({
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
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    for (let i = 0; i < listData.length; i++) {
      const data = listData[i];
      const dayOfWeekData = formatDayOfWeekForDatabase(data[4]);
      const formData = new FormData();
      formData.append("name", data[0]);
      formData.append("phone", data[1]);
      formData.append("birth", data[2]);
      formData.append("startDate", data[3]);
      formData.append("dayOfWeek", dayOfWeekData);
      formData.append("commission", data[5]);
      formData.append("bank", data[6]);
      formData.append("accountNumber", data[7]);

      const response = await createWorker(true, null, formData);
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

export default WorkersUploadBtn;
