"use client";
import React from "react";
import Link from "next/link";
import { cls } from "@/libs/client/utils";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(tabBar)/main/api";

const Web = () => {
  const pathname = usePathname();
  return (
    <div className="hidden xl:flex fixed top-0 z-10 h-20 w-full px-7 py-2 items-center space-x-6 bg-white/90">
      <Link
        className="text-3xl font-extrabold text-emerald-700 cursor-pointer"
        href={"/main"}
      >
        memberee
      </Link>
      <div className="flex-1 flex justify-center">
        <ul className="flex items-center mx-auto space-x-8 xl:space-x-20 text-base xl:text-lg font-semibold *:flex-nowrap">
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
        <div onClick={() => logout()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 stroke-1.5 hover:text-emerald-700 transition-colors text-stone-800 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Web;
