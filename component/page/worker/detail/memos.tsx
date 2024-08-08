import React, { useEffect, useState } from "react";
import { WorkerMemo } from ".prisma/client";
import { format } from "date-fns";
import Modal from "../../../modal/modal";
import MemoModal from "../../../modal/memoModal";

import { Memo } from "@prisma/client";
import { cls } from "../../../../libs/client/utils";
import InfiniteScroll from "../../../infiniteScroll";

const Memos = ({
  memos,
  id,
  title,
  status,
  isMember,
  createMemo,
  updateMemo,
  deleteMemo,
  loading,
  setSlice,
}: {
  memos: WorkerMemo[] | Memo[];
  id: string;
  title: string;
  status?: number;
  isMember?: boolean;
  createMemo: any;
  updateMemo: any;
  deleteMemo: any;
  loading: boolean;
  setSlice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [memoType, setMemoType] = useState<"create" | "read">("create");
  const [savedMemo, setSavedMemo] = useState("");
  const [memoId, setMemoId] = useState(-1);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData((prevData) => {
      const addData = memos.filter(
        (newMemos) =>
          !prevData.some((existingMemo) => existingMemo.id === newMemos.id),
      );
      return [...prevData, ...addData];
    });
  }, [memos]);

  useEffect(() => {}, [data]);
  const handleClickMemo = (savedMemo: string, memoId: number) => {
    setMemoType("read");
    setSavedMemo(savedMemo);
    setMemoId(memoId);
    setIsMemoModalOpen(true);
  };
  const handleClickMemoAdd = () => {
    setMemoType("create");
    setIsMemoModalOpen(true);
  };
  return (
    <>
      {isMemoModalOpen && (
        <Modal
          title={title}
          content={
            <MemoModal
              id={id}
              createMemo={createMemo}
              updateMemo={updateMemo}
              deleteMemo={deleteMemo}
              savedMemo={savedMemo}
              type={memoType}
              memoId={memoId}
              onClose={() => setIsMemoModalOpen(false)}
            />
          }
          onClose={() => setIsMemoModalOpen(false)}
        />
      )}
      <div
        className={cls(
          "relative text-stone-600 font-bold text-base xl:text-lg flex justify-center items-center h-16 bg-neutral-100 col-span-2 border-x  border-neutral-300 border-b-0",
        )}
      >
        <span>{title}</span>
        <button
          className="absolute right-5 text-emerald-600 hover:text-emerald-500"
          type={"button"}
          onClick={() => handleClickMemoAdd()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {data?.length > 0 && (
        <div
          className={cls(
            "col-span-2 border border-neutral-300 max-h-[40vh] overflow-x-hidden overflow-y-auto",
            isMember ? "border-b-1 rounded-b-lg" : "",
          )}
        >
          <InfiniteScroll setSlice={setSlice} loading={loading}>
            <>
              <table className="w-full">
                <thead>
                  <tr className="sticky top-0 bg-stone-100 font-semibold text-sm xl:text-lg text-center *:py-3 border border-b border-x-0 border-t-0">
                    <td className="w-1/6 font-semibold">작성일</td>
                    <td className="text-center font-semibold">내용</td>
                  </tr>
                </thead>
                <tbody>
                  {data.map((memo, index) => (
                    <tr
                      key={index}
                      className={cls(
                        "*:py-3 *:text-center *:align-middle border-stone-100 text-sm xl:text-base",
                        status && status > 0
                          ? "hover:bg-orange-100 cursor-pointer"
                          : "",
                      )}
                      onClick={
                        status && status > 0
                          ? () => handleClickMemo(memo.content, memo.id)
                          : undefined
                      }
                    >
                      <td>{format(memo.createdAt + "", "yyyy. MM. dd.")}</td>
                      <td className="p-3 truncate">
                        {`${memo.content.length > 100 ? memo.content.slice(0, 100) + "..." : memo.content}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Memos;
