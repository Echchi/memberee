"use client";
import React, { useState } from "react";
import Modal from "@/component/modal";
import Page from "@/app/(tabBar)/worker/register/page";
import Button from "@/component/button/button";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const router = useRouter();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <>
      {registerModalOpen && (
        <Modal
          title={"직원 등록"}
          content={<Page />}
          onClose={() => setRegisterModalOpen(false)}
          className={"lg:w-2/3"}
        />
      )}
      <Button
        onClick={() => router.push("/worker/register")}
        text={"직원 등록"}
        className="mt-0 !w-1/12 !bg-emerald-500 hover:!bg-emerald-500/80 active:!bg-emerald-600"
      />
    </>
  );
};

export default RegisterModal;
