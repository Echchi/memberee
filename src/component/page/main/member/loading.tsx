import React from "react";

const Loading = () => {
  return (
    <div className="text-center w-full">
      <div className="sticky top-0 bg-white z-20 space-y-3">
        <div className="skeleton rounded-lg h-8 w-full" />
        <div className="skeleton rounded-lg h-8 w-11/12" />
        <div className="skeleton rounded-lg h-8 w-9/12" />
        <div className="skeleton rounded-lg h-8 w-7/12" />
        <div className="skeleton rounded-lg h-8 w-6/12" />
        <div className="skeleton rounded-lg h-8 w-4/12" />
        <div className="skeleton rounded-lg h-8 w-4/12" />
        <div className="skeleton rounded-lg h-8 w-2/12" />
      </div>
    </div>
  );
};

export default Loading;
