import React from "react";
import { cls, tagValue } from "../libs/utils";
import Tag from "./tag";
interface TaskContent {
  title: string;
  location: string;
  primary?: string;
  sub?: string;
  startTime?: string;
  endTime?: string;
  status?: "pending" | "approved" | "rejected";
  writer?: string;
  regDate?: string;
}
interface TaskBoxProps {
  icon?: React.ReactElement;
  content: TaskContent;
  onClick: (event: React.MouseEvent) => void;
  type: "task" | "report";
  boxClassName?: string;
  iconClassName?: string;
}

const TaskBox = ({
  icon,
  content,
  onClick,
  type,
  boxClassName,
  iconClassName,
}: TaskBoxProps) => {
  return (
    <div
      onClick={onClick}
      className={cls(
        "h-20 rounded-lg p-3 hover:scale-95 transition-all cursor-pointer",
        boxClassName ? boxClassName : "",
      )}
    >
      <p className="flex items-center justify-between text-gray-950 font-medium pl-2">
        <span className="flex items-center space-x-1">
          <span className={iconClassName && cls(iconClassName)}>{icon}</span>
          <span>{type === "task" ? content.title : content.location}</span>
        </span>
        {type === "task" ? (
          <span>
            {content.sub}
            {content.sub ? "/" : ""} {content.primary}
          </span>
        ) : content.regDate ? (
          <span className="text-xs md:text-base">{content.regDate}</span>
        ) : (
          <></>
        )}
      </p>
      <p className="flex items-center justify-between text-gray-950 font-semibold pl-2">
        <span className="flex items-center text-gray-950 font-semibold space-x-3 py-1">
          <span className={cls(type === "task" ? "text-xl" : "text-lg")}>
            {type === "task" ? content.location : content.title}
          </span>
        </span>
        {type === "task" ? (
          <span>
            {content.startTime} {content.startTime ? "-" : ""} {content.endTime}
          </span>
        ) : content.writer ? (
          <span>{content.writer}</span>
        ) : (
          <Tag
            color={tagValue(content.status || "approval").color}
            title={tagValue(content.status || "approval").title}
          />
        )}
      </p>
    </div>
  );
};

export default TaskBox;
