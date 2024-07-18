import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../input";
import { cls, formatCurrency } from "../../../libs/client/utils";
import { DAYOFWEEK } from "../../../libs/constants";
import SelectTime from "../member/register/selectTime";
import WorkerList from "../member/register/workerList";
import Button from "../../button/button";
import Page from "../../../app/(tabBar)/member/register/page";
import MemberRegister from "./introduction/memberRegister";
const Introduction = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="w-full flex flex-col pt-32 md:pt-40">
          <div className="flex flex-col space-y-3 w-full">
            <p className="text-xl md:text-3xl font-semibold">
              엑셀을 대신 회원을 쉽게 관리하고 싶은
            </p>
            <p className="text-xl md:text-3xl font-semibold">
              테니스 관장님을 위해 만들었어요
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row md:justify-end gap-y-3 gap-x-3">
            <div className="w-full md:w-1/2 rounded-lg p-3 bg-neutral-50">
              <MemberRegister />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Introduction;
