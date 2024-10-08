import { cls } from "../../libs/client/utils";
import Web from "../../component/tabs/web";
import TopBar from "../../component/tabs/mobile/topBar";
import TabBar from "../../component/tabs/mobile/tabBar";
import PageTransition from "../../component/pageTransition";

export interface LayoutProps {
  hasTopBar?: boolean;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children?: React.ReactNode;
}

export default function Template({
  hasTopBar = true,
  canGoBack = true,
  hasTabBar = true,
  children,
}: LayoutProps) {
  return (
    <div className="flex flex-col xl:w-full xl:max-w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-white from-[1%] to-stone-100">
      <Web />

      {hasTopBar ? <TopBar canGoBack={canGoBack} /> : null}
      <PageTransition>
        <div
          className={cls(
            "xl:pt-28 xl:max-w-full xl:w-[1400px] xl:mx-auto px-1 xl:px-5 text-stone-800 min-h-fit",
            hasTabBar ? "mb-20" : "",
            hasTopBar ? "pt-16" : "",
          )}
        >
          {children}
        </div>
      </PageTransition>

      {hasTabBar ? <TabBar /> : null}
    </div>
  );
}
