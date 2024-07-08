import React from "react";
import Button from "@/component/button/button";
import { cls } from "@/libs/client/utils";

const WarningContent = ({
  onClose,
  memberCnt,
  ...rest
}: {
  onClose: () => void;
  memberCnt: number;

  [key: string]: any;
}) => {
  return (
    <div className="h-52 mb-3">
      <div className="h-4/5 flex flex-col justify-center items-center text-base xl:text-lg space-y-2 px-5 xl:px-0 whitespace-pre">
        <p>
          <span className="font-semibold text-red-500">담당 회원</span> 이
          있으면 퇴사 처리가 어려워요
        </p>
        <p>
          <span className="font-semibold text-red-500">{memberCnt}명</span>의
          회원들을 <span className="font-bold">다른 직원</span>에게 배정한 뒤
          다시 처리해주세요
        </p>
      </div>
      <div className="flex w-full justify-end space-x-3">
        <Button
          text={"확인"}
          className={"!w-1/6 py-3"}
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
};

export default WarningContent;
