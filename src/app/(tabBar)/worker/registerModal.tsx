"use client";
import React, { useState } from "react";
import Modal from "@/component/modal";
import Register from "@/app/(tabBar)/worker/register/page";
import Button from "@/component/button/button";

const RegisterModal = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <>
      {registerModalOpen && (
        <Modal
          title={"직원 등록"}
          content={<Register />}
          onClose={() => setRegisterModalOpen(false)}
          className={"md:w-2/3"}
        />
      )}
      <Button
        onClick={() => setRegisterModalOpen(true)}
        text={"직원 등록"}
        className="mt-0 py-3 lg:mt-5 !bg-emerald-500 hover:!bg-emerald-500/80 active:!bg-emerald-600"
      />
    </>
  );
};

export default RegisterModal;
