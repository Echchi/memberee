"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import JoinForm from "../../../components/page/join/components/joinForm";
import TokenError from "../../tokenError";
import { checkExpiresAt } from "./api";
import { PaymentType } from "../../../libs/constants";

export interface JoinFormType {
  userid: string;
  password: string;
  co_num: string;
  email: string;
  payDay?: string | null;
  paymentType: PaymentType;
}

const Join = () => {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
};

export default Join;
