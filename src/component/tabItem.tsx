import React from "react";
import { Link } from "react-router-dom";
import { cls } from "../libs/utils";

interface TabItemProps {
  location: string;
  url: string;
  icon: React.ReactElement;
  title: string;
}
const TabItem = ({ location, url, icon, title }: TabItemProps) => {
  return (
    <Link to={url}>
      <div
        className={cls(
          "flex flex-col items-center space-y-2 ",
          location === url
            ? "text-blue-500"
            : "hover:text-gray-500 transition-colors",
        )}
      >
        {icon}
        <span className="whitespace-pre-line">{title}</span>
      </div>
    </Link>
  );
};

export default TabItem;
