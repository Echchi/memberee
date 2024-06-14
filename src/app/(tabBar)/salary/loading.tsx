import React from "react";
import { format } from "date-fns";
import { PrintPdfBtn } from "@/component/pdf/printPdfBtn";
import Salary from "@/component/page/salary/salary";
import { formatCurrency } from "@/libs/client/utils";

const Loading = () => {
  return (
    <div className="mt-3 flex-col">
      <>
        <div className="flex justify-center items-center mb-3 xl:mb-7 mt-4">
          <div className="skeleton h-16 rounded-lg w-64 mx-auto" />
          <div className="w-16 xl:w-32 skeleton rounded-lg h-14" />
        </div>

        <div className="w-full space-y-4 *:skeleton *:h-14 *:xl:h-16 *:rounded-lg">
          <div className="w-full" />
          <div className="w-4/5" />
          <div className="w-3/5" />
          <div className="w-2/5" />
          <div className="w-2/5" />
          <div className="w-1/5" />
        </div>
      </>
    </div>
  );
};

export default Loading;
