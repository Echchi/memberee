import React from "react";
import Link from "next/link";
import { cls } from "@/libs/client/utils";

interface TabItemProps {
  location: string;
  url: string;
  icon: React.ReactElement;
  title: string;
}
const TabItem = ({ location, url, icon, title }: TabItemProps) => {
  return (
    <Link href={url}>
      <div
        className={cls(
          "flex flex-col items-center space-y-2",
          location.includes(url)
            ? "text-emerald-700"
            : "hover:text-stone-500 transition-colors text-stone-800",
        )}
      >
        {icon}
        <span
          className={cls(
            "whitespace-pre-line",
            location.includes(url)
              ? "text-emerald-700"
              : "hover:text-stone-500 transition-colors text-stone-800",
          )}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export default TabItem;
