"use client";
import React from "react";
import Web from "@/component/tabs/web";
import TopBar from "@/component/tabs/mobile/topBar";
import PageTransition from "@/component/pageTransition";
import Link from "next/link";
import TabBar from "@/component/tabs/mobile/tabBar";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col xl:w-full xl:max-w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-white from-[1%] to-stone-100">
      <Web />

      <TopBar canGoBack={true} />
      <PageTransition>
        <div className="xl:pt-28 xl:max-w-full xl:w-[1400px] xl:mx-auto px-3 xl:px-5 text-stone-800 min-h-fit mb-20 pt-16">
          <div className="flex flex-col justify-center items-center h-[500px] xl:h-[700px] my-auto space-y-4">
            <p className="text-7xl xl:text-9xl text-green-700 font-extrabold">
              앗!
            </p>
            <p className="text-2xl xl:text-4xl text-green-700 font-bold">
              갑자기 아주 작은 문제가 발생했어요!
            </p>
            <div className="flex xl:flex-row flex-col justify-center items-center">
              <Link
                href={"/main"}
                className="text-lg xl:text-xl font-semibold text-gray-700 hover:text-green-700 cursor-pointer transition-colors"
              >
                메인으로 돌아갈까요?
              </Link>
              <span className="text-lg xl:text-xl font-semibold text-gray-700 mx-2">
                아니면
              </span>
              <p
                onClick={() => router.back()}
                className="text-lg xl:text-xl font-semibold text-gray-700 hover:text-green-700 cursor-pointer transition-colors"
              >
                이전 페이지로 돌아갈까요?
              </p>
            </div>
          </div>
        </div>
      </PageTransition>

      <TabBar />
    </div>
  );
};

export default Error;
