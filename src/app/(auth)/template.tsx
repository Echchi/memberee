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
    <div className="flex flex-col md:w-full md:max-w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-white from-[1%] to-stone-100">
      <div className="hidden md:flex fixed top-0 z-10 h-20 w-full px-4 py-2 items-center space-x-6 bg-white/90">
        <Link
          className="text-4xl font-extrabold ml-3 text-emerald-700 cursor-pointer"
          href={"/main"}
        >
          memberee
        </Link>
        <div className="flex-1 flex justify-center">
          <ul className="flex items-center mx-auto space-x-8 lg:space-x-20 text-lg lg:text-xl font-semibold">
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
      {hasTopBar ? (
        <div className="md:hidden fixed bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium text-stone-800 border-b top-0 flex items-center z-10">
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
        </div>
      ) : null}
      <div
        className={cls(
          "md:pt-20 md:max-w-full md:w-[1400px] md:mx-auto px-3 lg:px-5 text-stone-800 min-h-[1100px]",
          hasTabBar ? "pb-24" : "",
          hasTopBar ? "pt-12" : "",
        )}
      >
        {children}
      </div>
      {hasTabBar ? (
        <nav className="md:hidden bg-white max-w-xl border-t fixed bottom-0 w-full px-3 pb-2 pt-3 flex justify-between text-xs">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            }
            url={"/worker"}
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
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            }
            url={"/member"}
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
            url={"/main"}
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
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
            url={"/class"}
            title={"수업 관리"}
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
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            }
            url={"/account"}
            title={"계정 관리"}
            location={pathname}
          />
        </nav>
      ) : null}
    </div>
  );
}
