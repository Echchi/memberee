"use client";
import { usePathname, useRouter } from "next/navigation";
import { cls } from "@/libs/client/utils";
import TabItem from "@/component/tabItem";
import Link from "next/link";

interface LayoutProps {
  title?: string;
  hasTopBar?: boolean;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Template({
  title,
  hasTopBar = true,
  canGoBack = true,
  hasTabBar = true,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:w-full md:max-w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-white from-5% to-slate-100">
      <div className="hidden md:flex fixed top-0 z-10 h-20 w-full px-4 py-2 items-center space-x-6 bg-white/90">
        <Link
          className="text-4xl font-extrabold ml-3 text-blue-600 cursor-pointer"
          href={"/admin/home"}
        >
          Memberee
        </Link>
        <div className="flex-1 flex justify-center">
          <ul className="flex items-center mx-auto space-x-8 lg:space-x-20 text-lg lg:text-xl font-semibold">
            <Link
              href={"/admin/task"}
              className={cls(
                "cursor-pointer",
                pathname === "/admin/task"
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors",
              )}
            >
              회원 관리
            </Link>
            <Link
              href={"/admin/report"}
              className={cls(
                "cursor-pointer",
                pathname === "/admin/report"
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors",
              )}
            >
              직원 관리
            </Link>
            <Link
              href={"/admin/member"}
              className={cls(
                "cursor-pointer",
                pathname === "/admin/member"
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors",
              )}
            >
              임금 관리
            </Link>

            <Link
              href={"/admin/account"}
              className={cls(
                "cursor-pointer",
                pathname === "/admin/account"
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors",
              )}
            >
              계정 관리
            </Link>
          </ul>
        </div>
      </div>
      {hasTopBar ? (
        <div className="md:hidden fixed bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium text-gray-800 border-b top-0 flex items-center z-10">
          {canGoBack ? (
            <button onClick={onClick} className="absolute left-4">
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
        </div>
      ) : null}
      <div
        className={cls(
          "md:pt-20 md:max-w-full md:w-[1400px] md:mx-auto px-3",
          hasTabBar ? "pb-24" : "",
          hasTopBar ? "pt-12" : "",
        )}
      >
        {children}
      </div>
      {hasTabBar ? (
        <nav className="md:hidden bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-3 pb-2 pt-3 flex justify-between text-xs">
          <TabItem
            icon={
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
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            }
            url={"/admin/task"}
            title={"직원 관리"}
            location={pathname}
          />
          <TabItem
            icon={
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
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
            }
            url={"/admin/report"}
            title={"회원 관리"}
            location={pathname}
          />
          <TabItem
            icon={
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            }
            url={"/admin/home"}
            title={"홈"}
            location={pathname}
          />
          <TabItem
            icon={
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
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            }
            url={"/admin/member"}
            title={"임금 관리"}
            location={pathname}
          />
          <TabItem
            icon={
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
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            }
            url={"/admin/project"}
            title={"계정 관리"}
            location={pathname}
          />
        </nav>
      ) : null}
    </div>
  );
}
