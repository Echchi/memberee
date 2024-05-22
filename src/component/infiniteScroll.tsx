"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
  children,
  setPage,
  loading,
}: {
  children: ReactElement;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}) => {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
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
  }, [loading, setPage]);

  return (
    <>
      {children}
      {!loading && (
        <div
          ref={target}
          className="absolute -bottom-20 h-2 w-full bg-red-500"
        />
      )}
    </>
  );
};

export default InfiniteScroll;
