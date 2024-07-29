"use client";
import React from "react";
import { RecoilRoot } from "recoil";

interface RecoilWrapperProps {
  children: React.ReactNode;
}

const RecoilWrapper = ({ children }: RecoilWrapperProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapper;
