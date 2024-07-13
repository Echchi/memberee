import React, { ReactElement } from "react";
import { cls } from "../libs/client/utils";

interface LineBoxProps {
  worker?: string;
  day?: string;
  name: string | ReactElement;
  phone: string;
  active: boolean;
  onClick?: () => void;
  isNotPaid?: boolean;
}

const LineBox = ({
  worker,
  day,
  name,
  phone,
  onClick,
  active,
  isNotPaid,
}: LineBoxProps) => {
  return (
    <div
      className={cls(
        "rounded-lg p-3 hover:scale-95 transition-all cursor-pointer w-full",
        isNotPaid
          ? !active
            ? "!bg-stone-200"
            : "!bg-orange-500/20"
          : "bg-neutral-100",
      )}
      onClick={onClick}
    >
      <p className="flex items-center justify-between text-gray-950 font-medium pl-2">
        <span className="flex items-center space-x-1">{worker}</span>
        <span className="flex items-center space-x-1">{day}</span>
      </p>
      <p className="flex items-center justify-between text-gray-950 font-semibold pl-2">
        <span className="flex items-center text-gray-950 font-semibold space-x-3 py-1 text-lg">
          {name}
        </span>
        <span>{phone}</span>
      </p>
    </div>
  );
};

export default LineBox;
