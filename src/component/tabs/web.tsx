"use client";
import React from "react";
import Link from "next/link";
import { cls } from "@/libs/client/utils";
import { usePathname } from "next/navigation";

const Web = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex fixed top-0 z-10 h-20 w-full px-4 py-2 items-center space-x-6 bg-white/90">
      <Link
        className="text-3xl font-extrabold ml-3 text-emerald-700 cursor-pointer"
        href={"/main"}
      >
        memberee
      </Link>
      <div className="flex-1 flex justify-center">
        <ul className="flex items-center mx-auto space-x-8 xl:space-x-20 text-base lg:text-lg font-semibold *:flex-nowrap">
          <Link
            className={cls(
              "cursor-pointer",
              pathname.includes("/pay")
                ? "text-emerald-700"
                : "hover:text-emerald-700 transition-colors text-stone-800",
            )}
            href={"/pay"}
          >
            납부 관리
          </Link>
          <Link
            className={cls(
              "cursor-pointer",
              pathname.includes("/member")
                ? "text-emerald-700"
                : "hover:text-emerald-700 transition-colors text-stone-800",
            )}
            href={"/member"}
          >
            회원 관리
          </Link>
          <Link
            className={cls(
              "cursor-pointer",
              pathname.includes("/worker")
                ? "text-emerald-700"
                : "hover:text-emerald-700 transition-colors text-stone-800",
            )}
            href={"/worker"}
          >
            직원 관리
          </Link>
          <Link
            className={cls(
              "cursor-pointer",
              pathname.includes("/class")
                ? "text-emerald-700"
                : "hover:text-emerald-700 transition-colors text-stone-800",
            )}
            href={"/class"}
          >
            수업 관리
          </Link>
          <Link
            className={cls(
              "cursor-pointer",
              pathname.includes("/salary")
                ? "text-emerald-700"
                : "hover:text-emerald-700 transition-colors text-stone-800",
            )}
            href={"/salary"}
          >
            임금 관리
          </Link>
          <Link
            className={cls(
              "cursor-pointer",
              pathname.includes("/account")
                ? "text-emerald-700"
                : "hover:text-emerald-700 transition-colors text-stone-800",
            )}
            href={"/account"}
          >
            계정 관리
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Web;