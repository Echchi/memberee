"use client";
import React from "react";
import Button from "../../button/button";
import { useRouter } from "next/navigation";

const RegisterBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/member/register")}
      text={"회원 등록"}
      className="mt-0 py-3 !bg-emerald-500 hover:!bg-emerald-500/80 active:!bg-emerald-600"
    />
  );
};

export default RegisterBtn;
