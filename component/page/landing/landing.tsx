"use client";

import ScrollProvider, { useScrollContext } from "./scrollProvider";
import SlideMenu from "./slideMenu";
import Start from "./start";
import Introduction from "./introduction";
import Function from "./function";
import Qna from "./qna";
import Footer from "./footer";

export default function Landing() {
  const { sectionRefs, scrollToRef } = useScrollContext();
  return (
    <div className="h-screen">
      <div className="hidden fixed top-0 w-full h-16 lg:flex items-center px-3 md:px-10 bg-white">
        <span className="text-3xl font-extrabold text-green-800">Memberee</span>
        <nav className="w-full ml-32">
          <ul className="flex item-center text-xl space-x-10 *:text-gray-950 *:font-semibold *:cursor-pointer">
            <li onClick={() => scrollToRef(sectionRefs.introRef)}>소개</li>
            <li onClick={() => scrollToRef(sectionRefs.funcRef)}>기능</li>
            <li onClick={() => scrollToRef(sectionRefs.qnaRef)}>문의</li>
          </ul>
        </nav>
      </div>
      <div className="pt-16 px-10 md:px-64 md:my-[150px] my-24">
        <Start />
        <div ref={sectionRefs.introRef}>
          <Introduction />
        </div>
        <div ref={sectionRefs.funcRef}>
          <Function />
        </div>
        <div ref={sectionRefs.qnaRef}>
          <Qna />
        </div>
      </div>
      <Footer />

      <SlideMenu />
    </div>
  );
}
