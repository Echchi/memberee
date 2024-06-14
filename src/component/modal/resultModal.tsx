import React from "react";

const ResultModal = ({ content }: { content: string }) => {
  return (
    <div className="absolute right-0 h-3/4 w-full flex flex-col justify-center items-center bg-white z-20 space-y-4">
      <svg width="50" height="50" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgb(21, 128, 61)"
          strokeWidth="7"
        />
        <path
          d="M30 50 L45 65 L70 35"
          fill="none"
          stroke="rgb(21, 128, 61)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0, 100"
            to="100, 0"
            dur="0.5s"
            fill="freeze"
          />
        </path>
      </svg>
      <p className="text-base xl:text-lg text-green-700 font-bold">{content}</p>
    </div>
  );
};

export default ResultModal;
