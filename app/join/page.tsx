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
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    const checkTokenExpires = async (token: string) => {
      try {
        const result = await checkExpiresAt(token);
        if (!result.email) {
          setIsValidToken(false);
        }
      } catch {
        setIsValidToken(false);
      }
    };

    if (token) {
      checkTokenExpires(token);
    } else {
      setIsValidToken(false);
    }
  }, [token]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isValidToken ? <JoinForm /> : <TokenError />}
    </Suspense>
  );
};

export default Join;
