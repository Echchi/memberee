"use client";
import React, { createContext, RefObject, useContext, useRef } from "react";

interface IScrollContextType {
  scrollToRef: (ref: RefObject<HTMLDivElement>) => void;
  sectionRefs: {
    introRef: RefObject<HTMLDivElement>;
    funcRef: RefObject<HTMLDivElement>;
    qnaRef: RefObject<HTMLDivElement>;
  };
}
const ScrollContext = createContext<IScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("Context Missing");
  }
  return context;
};
const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const funcRef = useRef<HTMLDivElement | null>(null);
  const qnaRef = useRef<HTMLDivElement | null>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ScrollContext.Provider
      value={{ scrollToRef, sectionRefs: { introRef, funcRef, qnaRef } }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
