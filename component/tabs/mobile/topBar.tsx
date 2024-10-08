"use client";
import React, { useEffect, useState } from "react";
import { cls } from "../../../libs/client/utils";
import { useRouter } from "next/navigation";
import { LayoutProps } from "../../../app/(tabBar)/template";
import { usePathname } from "next/navigation";
const TopBar = ({ canGoBack }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const onClick = () => {
    router.back();
  };
  useEffect(() => {
    if (pathname.includes("pay")) {
      setTitle("납부 관리");
    } else if (pathname.includes("member")) {
      setTitle("회원 관리");
    } else if (pathname.includes("main")) {
      setTitle("홈");
    } else if (pathname.includes("class")) {
      setTitle("수업 관리");
    } else if (pathname.includes("salary")) {
      setTitle("납부 관리");
    } else if (pathname.includes("account")) {
      setTitle("계정 관리");
    } else if (pathname.includes("worker")) {
      setTitle("직원 관리");
    } else if (pathname.includes("join")) {
      setTitle("회원 가입");
    }
  }, [pathname]);

  return (
    <div className="xl:hidden fixed bg-white w-full h-16 max-w-xl justify-center text-lg px-10 font-medium text-stone-800 border-b top-0 flex items-center z-10">
      {canGoBack ? (
        <button
          onClick={onClick}
          className="absolute left-4"
          data-testid="back-button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      ) : null}
      {title ? (
        <span className={cls(canGoBack ? "mx-auto" : "", "")}>{title}</span>
      ) : null}
      <button
        onClick={() => router.push("/account")}
        className="absolute right-4 hover:animate-spin"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TopBar;
