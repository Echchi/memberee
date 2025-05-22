"use client";
import React from "react";
import { motion } from "framer-motion";
const colorClasses = {
  blue: "bg-point_blue_hover",
  green: "bg-point_green_hover",
};
const ProgressBar = ({ progress }: { progress: number }) => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: progress + "%",
      transition: {
        duration: progress < 100 ? 3 : progress > 50 ? 4 : 0.3,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="h-4 xl:h-6 bg-gray-200 rounded-full w-3/5 overflow-hidden">
      <motion.div
        className={`bg-emerald-600 h-full rounded-full w-full animate-pulse`}
        variants={variants}
        initial="initial"
        animate="animate"
      />
    </div>
  );
};

export default ProgressBar;
