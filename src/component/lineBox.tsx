import React from "react";
import { cls } from "@/libs/client/utils";

interface LineBoxProps {
  worker?: string;
  day?: string;
  name: string;
  phone: string;
  pay: boolean;
  onClick?: () => void;
}

const LineBox = ({ worker, day, name, phone, onClick, pay }: LineBoxProps) => {
  return (
    <div
      className={cls(
        "rounded-lg p-3 hover:scale-95 transition-all cursor-pointer w-full",
        pay ? "bg-stone-200" : "bg-orange-200",
      )}
      onClick={onClick}
    >
      <p className="flex items-center justify-between text-gray-950 font-medium pl-2">
        <span className="flex items-center space-x-1">{worker}</span>
        <span className="flex items-center space-x-1">{day}</span>
      </p>
      <p className="flex items-center justify-between text-gray-950 font-semibold pl-2">
        <span className="flex items-center text-gray-950 font-semibold space-x-3 py-1">
          <span className="text-xl">{name}</span>
        </span>
        <span>{phone}</span>
      </p>
    </div>
  );
};

export default LineBox;
