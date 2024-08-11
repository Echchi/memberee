import React from "react";

const Loading = () => {
  return (
    <div className="xl:pt-28 xl:max-w-full xl:w-[1400px] xl:mx-auto px-3 xl:px-5 text-stone-800 min-h-fit mb-20 pt-16">
      <div className="flex flex-col justify-center items-center h-[500px] xl:h-[700px] my-auto space-y-2 xl:space-y-4">
        <p className="text-xl xl:text-4xl text-green-700 font-bold">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
};

export default Loading;
