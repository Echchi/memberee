"use client";
import React, { useEffect, useRef, useState } from "react";
import { calculateSalary, formatCurrency } from "@/libs/client/utils";
import Salary from "@/component/page/salary/salary";
import Modal from "@/component/modal";
import SalaryDetail from "@/app/(tabBar)/salary/salaryDetail";
import { WorkerWithMember } from "@/app/(tabBar)/salary/page";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { format } from "date-fns";
import { PrintPdfBtn } from "@/component/pdf/printPdfBtn";

const SalaryList = ({ workers }: { workers: WorkerWithMember[] }) => {
  const salaryRef = useRef<HTMLDivElement | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [totalLessonFee, setTotalLessonFee] = useState<number[]>([]);
  const [clickedWorker, setClickedWorker] = useState<number>(-1);
  const [selectedMembers, setSelectedMembers] = useState<
    IMemberWithSchedules[] | null
  >(null);
  const [totalLessonFeeVal, setTotalLessonFeeVal] = useState(0);
  const [totalSalaryVal, setTotalSalaryVal] = useState(0);

  const [workerSalaries, setWorkerSalaries] = useState<number[]>([]);
  useEffect(() => {
    const allTotalLessonFee = workers.map((worker) => {
      const totalLessonFee = worker.Member.reduce((total, member) => {
        // 회원의 첫번째 스케줄의 수업료만 계산
        const firstLessonFee = member?.Schedule?.[0]?.lessonFee || 0;
        return total + firstLessonFee;
      }, 0);
      return totalLessonFee;
    });

    setTotalLessonFee(allTotalLessonFee);

    const allWorkerSalaries = allTotalLessonFee.map((lessonFee, index) =>
      calculateSalary(lessonFee, workers[index]?.commission),
    );

    setWorkerSalaries(allWorkerSalaries);
  }, [workers]);

  useEffect(() => {
    setTotalSalaryVal(workerSalaries.reduce((acc, curr) => acc + curr, 0));
  }, [workerSalaries]);
  useEffect(() => {
    setTotalLessonFeeVal(totalLessonFee.reduce((acc, curr) => acc + curr, 0));
  }, [totalLessonFee]);

  useEffect(() => {
    const selectedWorker = workers?.find(
      (worker) => worker?.id === clickedWorker,
    );
    setSelectedMembers(selectedWorker ? selectedWorker.Member : null);
  }, [workers, clickedWorker]);

  return (
    <>
      {openDetailModal && (
        <Modal
          onClose={() => setOpenDetailModal(false)}
          title={"회원 수업료"}
          content={
            selectedMembers ? <SalaryDetail members={selectedMembers} /> : <></>
          }
        />
      )}
      <div ref={salaryRef} className="xl:box my-4 xl:mt-3 xl:mb-0 flex-col">
        <>
          <div className="flex justify-center items-center font-semibold text-xl xl:text-2xl mb-3 xl:mb-7 mt-4">
            <span className="xl:px-6 px-4 mx-auto">
              {format(new Date(), "yyyy년 MM월")}
            </span>
            <div className="w-16 xl:w-32 print:hidden hidden xl:block">
              <PrintPdfBtn
                title={`${format(new Date(), "yyyy년 MM월")} 예상 임금_${format(new Date(), "yyyyMMdd")}`}
                content={salaryRef}
              />
            </div>
          </div>

          <div ref={salaryRef} className="w-full">
            <table className="w-full table-auto">
              <thead className="sticky top-20 print:top-0">
                <tr className="*:text-xs xl:*:text-lg bg-stone-100 font-semibold text-center *:py-3">
                  <td>이름</td>
                  <td>담당 회원 수</td>
                  <td>회원 수업료</td>
                  <td>수수료</td>
                  <td>부담금</td>
                  <td>예상 임금</td>
                </tr>
              </thead>
              <tbody className="overflow-y-auto print:overflow-visible">
                {workers.map((worker) => (
                  <tr
                    key={`salary_${worker?.id}`}
                    className="*:text-xs xl:*:text-base *:py-3 text-center border-b border-stone-100"
                  >
                    <Salary
                      worker={worker}
                      openDetailModal={openDetailModal}
                      setOpenDetailModal={setOpenDetailModal}
                      setClickedWorker={setClickedWorker}
                    />
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0">
                <tr className="*:text-xs xl:*:text-base *:py-3 text-center border-b border-stone-100 bg-stone-100">
                  <td>합계</td>
                  <td>{totalLessonFee.length} 명</td>
                  <td>{formatCurrency(totalLessonFeeVal)}원</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{formatCurrency(totalSalaryVal)}원</td>
                </tr>
                <tr className="*:text-xs xl:*:text-base *:bold sticky bottom-0 *:py-3 text-center border-b border-stone-100 bg-orange-100">
                  <td colSpan={4}>예상 수익</td>

                  <td colSpan={2}>
                    {formatCurrency(totalLessonFeeVal - totalSalaryVal)} 원
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      </div>
    </>
  );
};

export default SalaryList;
