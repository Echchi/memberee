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
          location === url
            ? "text-emerald-600"
            : "hover:text-stone-500 transition-colors text-stone-800",
        )}
      >
        {icon}
        <span className="whitespace-pre-line">{title}</span>
      </div>
    </Link>
  );
};

export default TabItem;
