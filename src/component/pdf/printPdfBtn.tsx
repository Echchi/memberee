import React, { ReactElement, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "@/component/button/button";

export const PrintPdfBtn = ({
  title,
  content,
}: {
  title: string;
  content: React.RefObject<HTMLDivElement>;
}) => {
  const handlePrint = useReactToPrint({
    documentTitle: title,
    removeAfterPrint: true,
  });

  return (
    <>
      <Button
        text="출력"
        type="button"
        className="my-2"
        isButtonDisabled={!content}
        onClick={() => {
          handlePrint(null, () => content?.current);
        }}
      />
    </>
  );
};
