import React from "react";
import { cls } from "@/libs/client/utils";

export interface TagProps {
  color: "emerald" | "stone" | "orange";
  noBg?: boolean;
  reason?: string;
  title: string;
}

const Tag = ({ color, noBg = false, title }: TagProps) => {
  if (color === "emerald") {
    return (
      <span
        className={cls(
          "flex items-center transition-colors px-3 py-1 rounded-full font-semibold  text-emerald-600",
          noBg ? "ring-1 ring-emerald-200" : "bg-emerald-500/20",
        )}
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
        )}
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
        )}
      >
        {title}
      </span>
    );
  } else {
    return <></>;
  }
};

export default Tag;
