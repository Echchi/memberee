"use client";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/libs/client/utils";
import Salary from "@/component/page/salary/salary";
import Modal from "@/component/modal";
import SalaryDetail from "@/app/(tabBar)/salary/salaryDetail";
import { WorkerWithMember } from "@/app/(tabBar)/salary/page";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";

const SalaryList = ({ workers }: { workers: WorkerWithMember[] }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [totalLessonFee, setTotalLessonFee] = useState<number[]>([]);
  const [clickedWorker, setClickedWorker] = useState<number>(-1);
  const [selectedMembers, setSelectedMembers] = useState<
    IMemberWithSchedules[] | null
  >(null);

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

    const allWorkerSalaries = allTotalLessonFee.map((lessonFee, index) => {
      const commission = (workers[index]?.commission || 0) / 100;
      const expectedSalary = lessonFee * (1 - commission) * (1 - 0.033);
      return expectedSalary;
    });

    setWorkerSalaries(allWorkerSalaries);
  }, [workers]);
  useEffect(() => {
    console.log("workerSalaries", workerSalaries);
    console.log(
      "workerSalaries",
      workerSalaries.reduce((acc, curr) => acc + curr, 0),
    );
  }, [workerSalaries]);

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
      <div className="box mt-3">
        <div className="w-full">
          <table className="w-full table-auto">
            <thead className="sticky top-20">
              <tr className="text-xs lg:text-lg bg-stone-100 font-semibold text-center *:py-3">
                <td>이름</td>
                <td>담당 회원 수</td>
                <td>회원 수업료</td>
                <td>수수료</td>
                <td>부담금</td>
                <td>예상 임금</td>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {workers.map((worker) => (
                <tr
                  key={`salary_${worker?.id}`}
                  className="text-xs lg:text-base *:py-3 text-center border-b border-stone-100"
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
              <tr className="text-xs lg:text-base *:py-3 text-center border-b border-stone-100 bg-stone-100">
                <td>합계</td>
                <td>{totalLessonFee.length} 명</td>
                <td>
                  {formatCurrency(
                    totalLessonFee.reduce((acc, curr) => acc + curr, 0),
                  )}
                  원
                </td>
                <td>-</td>
                <td>-</td>
                <td>
                  {formatCurrency(
                    workerSalaries.reduce((acc, curr) => acc + curr, 0),
                  )}
                  원
                </td>
              </tr>
              <tr className="text-xs lg:text-base *:bold *:text-lg sticky bottom-0 *:py-3 text-center border-b border-stone-100 bg-orange-100">
                <td colSpan={4}>예상 수익</td>

                <td colSpan={2}>{formatCurrency(100)} 원</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default SalaryList;
