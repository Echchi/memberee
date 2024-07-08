"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from "@/component/progressbar";

const BulkLoading = ({ progress }: { progress: number }) => {
  const msgs = ["창을 닫지 말아주세요", "열심히 등록중이에요"];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prevIndex) => (prevIndex + 1) % msgs.length);
    }, 3000);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 정리
  }, []);

  return (
    <div className="w-full py-auto flex flex-col justify-center items-center space-y-1 xl:space-y-3 mt-40 xl:mt-60">
      <div className="text-xl text-center">
        <p className="text-emerald-700 font-bold text-lg xl:text-3xl animate-pulse">
          {msgs[msgIndex]}
        </p>
      </div>
      <p className="text-emerald-700 font-bold text-lg xl:text-3xl">
        {progress.toFixed(0)} %
      </p>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default BulkLoading;
