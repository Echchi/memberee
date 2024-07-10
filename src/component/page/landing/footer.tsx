import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t h-24  md:h-32 py-2 md:py-4 space-y-2 md:space-y-3 mt-24 md:mt-48">
      <span className="text-xl md:text-3xl font-extrabold text-green-800">
        Memeberee
      </span>
      <div className="divide-x text-gray-400 space-x-2 md:space-x-4 *:px-4 text-xs md:text-base">
        <Link href={"/"} className="!pl-0">
          서비스 이용약관
        </Link>
        <Link href={"/"}>개인정보 처리방침</Link>
        <Link href={"/"}>서비스 이용정책</Link>
      </div>
    </div>
  );
};

export default Footer;
