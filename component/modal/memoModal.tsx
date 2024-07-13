"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import { cls } from "../../libs/client/utils";
import { getWorker } from "../../app/(tabBar)/worker/[id]/api";
import { revalidatePath } from "next/cache";

const MemoModal = ({
  id,
  createMemo,
  updateMemo,
  deleteMemo,
  type,
  savedMemo,
  memoId,
  onClose,
}: {
  id: string;
  createMemo: any;
  updateMemo: any;
  deleteMemo: any;
  type: "read" | "create";
  savedMemo?: string;
  memoId?: number;
  onClose: () => void;
}) => {
  const [memo, setMemo] = useState(type === "read" ? savedMemo : "");
  const [error, setError] = useState("");
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const MAX_LENGTH = 500;
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    if (value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setMemo(event.target.value);
  };

  const handleClick = () => {
    if (!memo) {
      setError("내용을 입력해주세요");
      memoRef.current?.focus();
    } else {
      if (type === "read" && isEdit) {
        updateMemo(memoId, memo);
        setIsEdit(false);
      } else if (type === "create" && !isEdit) {
        createMemo(id, memo);
      }
    }
  };

  const handleClickDelete = () => {
    deleteMemo(memoId);
    onClose();
    window.location.reload();
  };

  useEffect(() => {
    if (memo && memo?.length > 0) setError("");
  }, [memo]);

  return (
    <>
      {type === "read" && !isEdit ? (
        <div
          className={cls(
            "w-full h-52 bg-neutral-100 p-4 rounded-xl overflow-y-auto outline-none",
          )}
        >
          {savedMemo}
        </div>
      ) : (
        <textarea
          ref={memoRef}
          name="memo"
          className={cls(
            "w-full h-52 bg-neutral-100 p-4 rounded-xl resize-none overflow-y-auto outline-none focus:ring-2",
            error ? "focus:ring-orange-500" : "focus:ring-emerald-600",
          )}
          maxLength={MAX_LENGTH}
          value={memo}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event)
          }
        />
      )}
      <p className="text-orange-500">{error}</p>
      {isEdit ? (
        <div className="flex justify-end space-x-3">
          <Button
            text="완료"
            className="mt-3 !w-1/6"
            type="button"
            onClick={handleClick}
          />
        </div>
      ) : (
        <div className="flex justify-end space-x-3">
          <Button
            text="삭제"
            className="mt-3 red_btn !w-1/6 py-3"
            type="button"
            onClick={handleClickDelete}
          />
          <Button
            text={type === "read" ? "수정" : "등록"}
            className="mt-3"
            type="button"
            onClick={type === "read" ? () => setIsEdit(true) : handleClick}
          />
        </div>
      )}
    </>
  );
};

export default MemoModal;
