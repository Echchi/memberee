import React from "react";
import Button from "@/component/button/button";

const ConfirmModal = ({
  action,
  onClose,
  onConfirm,
  ...rest
}: {
  action: string;
  onClose: () => void;
  onConfirm: () => void;
  [key: string]: any;
}) => {
  return (
    <div className="h-52 mb-3">
      <div className="h-4/5 flex flex-col justify-center items-center text-lg space-y-2">
        <p>{action} 처리는 복구되지 않습니다</p>
        <p>
          <span className="font-semibold">{rest.name}</span> 님을 정말 {action}
          하시겠습니까?
        </p>
      </div>
      <div className="flex w-full justify-end space-x-3">
        <Button
          text={"취소"}
          className={"gray_btn !w-1/6"}
          onClick={() => onClose()}
        />
        <Button text={"확인"} className="!w-1/6" onClick={() => onConfirm()} />
      </div>
    </div>
  );
};

export default ConfirmModal;
