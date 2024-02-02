import React from "react";
import { cls } from "../libs/utils";
export interface TagProps {
  color: "yellow" | "red" | "green" | "gray" | "blue";
  noBg?: boolean;
  reason?: string;
  title: string;
}

const Tag = ({ color, noBg = false, reason, title }: TagProps) => {
  if (color === "green") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-green-600",
          noBg ? "ring-1 ring-green-200" : "bg-green-500/20",
        )}
      >
        {title}
      </span>
    );
  } else if (color === "yellow") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-yellow-600",
          noBg ? "ring-1 ring-yellow-200" : "bg-yellow-500/20",
        )}
      >
        {title}
      </span>
    );
  } else if (color === "gray") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-gray-600",
          noBg ? "ring-1 ring-gray-200" : "bg-gray-500/20",
        )}
      >
        {title}
      </span>
    );
  } else if (color === "blue") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-blue-600",
          noBg ? "ring-1 ring-blue-200" : "bg-blue-500/20",
        )}
      >
        {title}
      </span>
    );
  } else if (color === "red" && !reason) {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold bg-red-500/20 text-red-600",
        )}
      >
        {title}
      </span>
    );
  } else if (color === "red" && reason) {
    return (
      <p
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-lg font-semibold bg-red-500/20 text-red-600",
        )}
      >
        {title}
        <span> : {reason}</span>
      </p>
    );
  } else {
    return <></>;
  }
};

export default Tag;
