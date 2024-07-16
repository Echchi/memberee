"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useScrollContext } from "./scrollProvider";

const SlideMenu = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { sectionRefs, scrollToRef } = useScrollContext();

  const handleMenuClick = (ref: React.RefObject<HTMLDivElement>) => {
    setMenuOpen(false);
    setTimeout(() => {
      scrollToRef(ref);
    }, 200);
  };

  return (
    <>
      <div className="flex fixed top-0 w-full h-16 lg:hidden items-center px-3 md:px-10 bg-white">
        <span className="text-3xl font-extrabold text-emerald-700">
          Memberee
        </span>
        <button className="absolute right-2" onClick={() => setMenuOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key={"menu"}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="lg:hidden fixed w-full h-full top-0 right-0 bg-white z-50"
          >
            <div className="h-16 flex items-center justify-end px-4">
              <div className="flex justify-between items-center w-full">
                <span className="text-3xl font-extrabold text-emerald-700">
                  Memberee
                </span>
                <button onClick={() => setMenuOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <nav className="mt-20">
              <ul className="px-8 *:h-16 *:text-gray-950 *:font-semibold *:text-2xl *:items-center *:cursor-pointer *:hover:text-gray-800">
                <li onClick={() => handleMenuClick(sectionRefs.introRef)}>
                  소개
                </li>
                <li onClick={() => handleMenuClick(sectionRefs.funcRef)}>
                  기능
                </li>
                <li onClick={() => handleMenuClick(sectionRefs.qnaRef)}>
                  문의
                </li>
              </ul>
            </nav>
            {/*</motion.div>*/}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SlideMenu;
