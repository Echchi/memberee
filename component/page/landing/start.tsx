import React from "react";
import Link from "next/link";
import Carousel from "./carousel";

const Introduction = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Carousel />
      <p className="text md:text-3xl font-semibold">
        을 위한 누구나 편하게 쓰기 쉬운 회원관리
      </p>

      <div className="w-full flex justify-center">
        <Link
          href={"/login"}
          className="rounded-full bg-emerald-600 text-white text-lg md:!mt-16 !mt-5 md:text-3xl text-center w-24 md:w-44 py-2 md:py-4 font-semibold hover:bg-emerald-500 active:bg-emerald-700 transition-colors"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
};

export default Introduction;
