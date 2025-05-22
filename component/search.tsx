"use client";
import React, { useEffect, useMemo, useState } from "react";
import Input from "./input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

const Search = ({ placeholder }: { placeholder: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const params = new URLSearchParams(searchParams.toString());
  const serchedTerm = params.get("query");
  const { replace } = useRouter();

  const handleChange = (searchTerm: string) => {
    debounceSearch(searchTerm);
  };

  const debounceSearch = useMemo(
    () =>
      debounce((searchTerm) => {
        if (searchTerm) {
          params.set("query", searchTerm.trim());
        } else {
          params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
      }, 200),
    [serchedTerm],
  );

  return (
    <div className="w-full">
      <Input
        type="text"
        name={"searchWord"}
        placeholder={placeholder}
        value={serchedTerm || ""}
        icon={
          <span className="text-gray-300">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        }
        className="rounded-xl border-0 h-12 bg-stone-100 w-full xl:w-1/2"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event.target.value)
        }
      />
    </div>
  );
};

export default Search;
