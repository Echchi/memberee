import React from "react";
import { cls } from "../libs/client/utils";

export interface TagProps {
  color: "emerald" | "stone" | "orange" | "yellow";
  noBg?: boolean;
  reason?: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

const Tag = ({ color, noBg = false, title, onClick, className }: TagProps) => {
  if (color === "emerald") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-emerald-600",
          noBg ? "ring-1 ring-emerald-200" : "bg-emerald-500/20",
          className ? className : "",
        )}
        onClick={onClick}
      >
        {title}
      </span>
    );
  } else if (color === "orange") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-orange-600",
          noBg ? "ring-1 ring-orange-200" : "bg-orange-500/20",
          className ? className : "",
        )}
        onClick={onClick}
      >
        {title}
      </span>
    );
  } else if (color === "stone") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-stone-600",
          noBg ? "ring-1 ring-stone-200" : "bg-stone-500/20",
          className ? className : "",
        )}
        onClick={onClick}
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
          className ? className : "",
        )}
        onClick={onClick}
      >
        {title}
      </span>
    );
  } else {
    return <></>;
  }
};

export default Tag;
