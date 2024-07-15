"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import JoinForm from "../../component/page/join/joinForm";
import TokenError from "../tokenError";
import { checkExpiresAt } from "./api";

export interface JoinFormType {
  userid: string;
  co_num: string;
  email: string;
  payDay?: string;
}

const Join = () => {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
};

export default Join;
