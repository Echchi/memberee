import React from "react";
import { AnimatePresence, motion } from "framer-motion";
const Introduction = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: "100%", opacity: "0" }}
        animate={{ x: 0, opacity: "1" }}
        exit={{ x: "-100%", opacity: "1" }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <div className="w-full flex flex-col md:text-lg font-semibold space-y-3">
          아주 간단한 회원관리를 위한 테니스 관장님을 위해 만들었어요
          <div className="w-full flex justify-between space-x-3">
            <div className="w-full bg-orange-500"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Introduction;
