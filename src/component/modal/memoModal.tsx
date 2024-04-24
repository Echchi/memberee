"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/component/button/button";
import { useFormState } from "react-dom";
import { createWorkerMemo } from "@/app/(tabBar)/worker/[id]/api";
import { cls } from "@/libs/client/utils";

const WorkerMemoModal = ({
  id,
  createMemo,
}: {
  id: string;
  createMemo: any;
}) => {
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setMemo(value);
  };

  const handleClick = () => {
    if (!memo) {
      setError("내용을 입력해주세요");
      memoRef.current?.focus();
    } else {
      createMemo(id, memo);
    }
  };
  useEffect(() => {
    if (memo.length > 0) setError("");
  }, [memo]);

  return (
    <>
      <textarea
        ref={memoRef}
        name="memo"
        className={cls(
          "w-full h-52 bg-neutral-100 p-4 rounded-xl resize-none overflow-y-auto outline-none focus:ring-2",
          error ? "focus:ring-orange-500" : "focus:ring-emerald-600",
        )}
        maxLength={500}
        value={memo}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event)
        }
      />
      <p className="text-orange-500">{error}</p>
      <Button
        text="등록"
        className="mt-3"
        type="button"
        onClick={handleClick}
      />
    </>
  );
};

export default WorkerMemoModal;
