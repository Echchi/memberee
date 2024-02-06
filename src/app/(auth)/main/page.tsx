import { format } from "date-fns";
import React from "react";

const Page = () => {
  const today = format(new Date(), "yyyy년 MM월 dd일 ");
  return (
    <div className="md:grid grid-cols-2 grid-rows-2 mt-4 lg:mt-12 md:gap-4">
      <div className="box">{today}</div>
      <div className="box items-center space-x-8 hover:shadow-lg cursor-pointer transition-all overflow-x-auto">
        <div className="flex flex-col justify-evenly items-center rounded-lg min-x-fit">
          <div className="rounded-full bg-gray-300 mb-4 h-20 w-20" />
          <p className="text-lg font-semibold">김직원</p>
          <p className="font-medium whitespace-nowrap">010-1111-2222</p>
        </div>
        <div className="flex flex-col items-center rounded-lg min-x-fit">
          <div className="rounded-full bg-gray-300 mb-4 h-20 w-20" />
          <p className="text-lg font-semibold">박직원</p>
          <p className="font-medium whitespace-nowrap">010-1111-2222</p>
        </div>
      </div>

      <div className="box col-span-2">회원 관리</div>
    </div>
  );
};

export default Page;
