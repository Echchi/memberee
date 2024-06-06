import React from "react";
import { cls } from "@/libs/client/utils";

const Loading = () => {
  return (
    <>
      <p className="flex items-center justify-between h-10 lg:h-14 w-full skeleton rounded-full px-5 lg:px-8 mt-0 lg:mt-3" />
      <div className="lg:grid grid-cols-2 grid-rows-3 gap-3 mt-4 lg:mt-12 lg:h-[700px]">
        <div className="relative box flex-col row-span-3 h-48 lg:h-full skeleton !shadow-none" />
        <div className="box flex-col justify-center space-x-2 h-32 lg:h-full lg:!py-2 skeleton !shadow-none" />
        <div className="box row-span-2 flex-col h-96 lg:h-full skeleton !shadow-none" />
      </div>
    </>
  );
};

export default Loading;
