"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
  children,
  setSlice,
  loading,
}: {
  children: ReactElement;
  setSlice: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}) => {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setSlice((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, setSlice]);

  return (
    <>
      {children}
      {!loading && (
        <div
          ref={target}
          className="h-2 w-full"
          // className="absolute -bottom-20 h-2 w-full bg-red-500"
        />
      )}
    </>
  );
};

export default InfiniteScroll;
