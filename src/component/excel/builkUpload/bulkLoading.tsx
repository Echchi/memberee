import React from "react";
import ProgressBar from "@/component/progressbar";

const BulkLoading = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full py-auto flex flex-col justify-center items-center space-y-5 mt-40">
      <div className="space-y-3 text-xl text-center pb-3">
        <p className="text-orange-500 font-bold text-5xl">
          창을 닫지 말아주세요
        </p>
        <p className="text-emerald-700 font-bold text-4xl">
          열심히 등록 중입니다
        </p>
      </div>
      <p className="text-emerald-700 font-bold text-4xl">
        {progress.toFixed(0)} %
      </p>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default BulkLoading;
