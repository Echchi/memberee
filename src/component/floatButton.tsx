import React from "react";

const FloatButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className="fixed  bottom-24 right-7 rounded-full w-14 h-14 flex justify-center items-center bg-blue-100 hover:bg-blue-50 active:bg-blue-200 transition-all shadow-xl"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export default FloatButton;
