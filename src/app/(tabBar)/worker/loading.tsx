import React from "react";
import Input from "@/component/input";
import Button from "@/component/button/button";

const Loading = () => {
  return (
    <>
      <div className="my-3 flex justify-between items-center lg:space-x-0 space-x-4">
        <div className="w-full">
          <div className="rounded-xl border-0 h-12 w-1/3 lg:w-1/4 skeleton" />
        </div>
        <div className="mt-0 py-3 !w-1/4 lg:!w-1/12 h-12 skeleton rounded-lg" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-3 ">
        {[...Array(5)].map((_, index) => (
          <div
            key={`worker_loading_${index}`}
            className="w-full rounded-lg items-center skeleton h-96"
          />
        ))}
      </div>
    </>
  );
};

export default Loading;
