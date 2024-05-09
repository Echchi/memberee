import React, { useCallback, useState } from "react";
import Button from "@/component/button/button";
import { createWorker } from "@/app/(tabBar)/worker/register/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import getSession from "@/libs/client/session";
import { formatDayOfWeekForDatabase } from "@/libs/client/utils";

const MemberUploadBtn = ({
  listData,
  errors,
  isLoading,
  setIsLoading,
  onClose,
}: {
  listData: string[][];
  errors: number[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const router = useRouter();
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    for (const data of listData) {
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
    }
    setIsLoading(false);
    onClose();
    router.push(`/worker`);
  }, [listData, errors]);

  return (
    <Button
      text={"등록"}
      className="py-3 hidden lg:block !w-1/6"
      isButtonDisabled={errors.length > 0}
      onClick={handleSubmit}
    />
  );
};

export default MemberUploadBtn;
