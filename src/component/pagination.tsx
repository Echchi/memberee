import React from "react";
import { cls } from "@/libs/client/utils";

const Pagination = ({
  total,
  page,
  setPage,
}: {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const currentPage = page;
  const pageCount = Math.ceil(total / 10);
  const pageNumbers: React.ReactElement[] = [];
  const visiblePageCount = 10;
  const pageStart =
    Math.floor((currentPage - 1) / visiblePageCount) * visiblePageCount + 1;
  const pageEnd = Math.min(pageStart + visiblePageCount - 1, pageCount);
  const isEmpty = total <= 10;

  const handlePageClick = (pageIndex: number) => {
    if (pageIndex < 1) {
      setPage(1);
    } else if (pageIndex > pageCount) {
      setPage(pageCount);
    } else {
      setPage(pageIndex);
    }
  };

  const renderPageNumbers = () => {
    for (let i = pageStart; i <= pageEnd; i++) {
      pageNumbers.push(
        <button
          className={cls(
            i === currentPage
              ? "px-4 py-2 font-bold rounded-full bg-stone-100"
              : "mx-4 hover:font-bold",
          )}
          key={i}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    !isEmpty && (
      <div className="flex justify-center items-center mt-10 *:text-lg space-x-4">
        <button onClick={() => handlePageClick(currentPage - 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 "
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex justify-center">{renderPageNumbers()}</div>
        <button onClick={() => handlePageClick(currentPage + 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    )
  );
};

export default Pagination;
