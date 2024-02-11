import React from "react";
import { cls } from "../libs/client/utils";

const StatusTab = ({
  title,
  status,
  type,
  onClick,
}: {
  title: string;
  status: string;
  type: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        "h-full px-5 transition-all",
        status === type ? "text-gray-950" : "text-gray-300 hover:text-gray-400",
        status === type ? "border-b-2 border-gray-400" : "",
      )}
    >
      {title}
    </button>
  );
};

export default StatusTab;
