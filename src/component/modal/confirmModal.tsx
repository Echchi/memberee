import React from "react";
import Button from "@/component/button/button";
import { cls } from "@/libs/client/utils";

const ConfirmModal = ({
  action,
  onClose,
  onConfirm,
  includeThismonth,
  terminate,
  ...rest
}: {
  action: string;
  onClose: () => void;
  onConfirm: () => void;
  includeThismonth?: boolean;
  terminate?: boolean;
  [key: string]: any;
}) => {
  return (
    <div className="h-52 mb-3">
      <div className="h-4/5 flex flex-col justify-center items-center text-base xl:text-lg space-y-2 px-5 xl:px-0 whitespace-pre">
        <p>
          <span className="font-semibold text-red-500">{action}</span> 처리는
          복구되지 않습니다
        </p>
        {!terminate && (
          <p>
            {action} 처리는 납부일을 기준으로{" "}
            {`${includeThismonth ? "이번 달" : "다음 달"}`}부터 적용됩니다.
          </p>
        )}
        {terminate ? (
          <p>
            정말 <span className="font-semibold text-red-500">{action}</span>
            하시겠습니까?
          </p>
        ) : (
          <p>
            <span className="font-semibold">{rest.name}</span> 님을 정말{" "}
            {action}
            하시겠습니까?
          </p>
        )}
      </div>
      <div className="flex w-full justify-end space-x-3">
        <Button
          text={"취소"}
          className={"!w-1/6 gray_btn py-3"}
          onClick={() => onClose()}
        />
        <Button
          text={"확인"}
          className={cls("!w-1/6", terminate ? "red_btn" : "")}
          onClick={() => onConfirm()}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;
