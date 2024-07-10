"use client";
import React from "react";
import Button from "@/component/button/button";
import { useRouter } from "next/navigation";

const Introduction = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-center items-center text-6xl md:text-9xl space-y-3">
      <p>시작</p>
      <p>어쩌구 저쩌구</p>
      <p>어쩌구 저쩌구</p>
    </div>
  );
};

export default Introduction;
