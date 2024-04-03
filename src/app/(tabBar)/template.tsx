import { usePathname, useRouter } from "next/navigation";
import { cls } from "@/libs/client/utils";
import TabItem from "@/component/tabItem";
import Link from "next/link";
import Web from "@/component/tabs/web";
import TopBar from "@/component/tabs/mobile/topBar";
import TabBar from "@/component/tabs/mobile/tabBar";

export interface LayoutProps {
  title?: string;
  hasTopBar?: boolean;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children?: React.ReactNode;
}

export default function Template({
  title,
  hasTopBar = true,
  canGoBack = true,
  hasTabBar = true,
  children,
}: LayoutProps) {
  return (
    <div className="flex flex-col md:w-full md:max-w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-white from-[1%] to-stone-100">
      <Web />

      {hasTopBar ? <TopBar canGoBack={canGoBack} title={title} /> : null}
      <div
        className={cls(
          "md:pt-28 md:max-w-full md:w-[1400px] md:mx-auto px-3 lg:px-5 text-stone-800",
          hasTabBar ? "pb-24" : "",
          hasTopBar ? "pt-12" : "",
        )}
      >
        {children}
      </div>
      {hasTabBar ? <TabBar /> : null}
    </div>
  );
}