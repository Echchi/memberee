import React, { useEffect, useState } from "react";
import { Member } from "@prisma/client";
import { getMembers, getWorker } from "@/app/(tabBar)/worker/[id]/api";
import { router } from "next/client";

const Members = ({ id }: { id: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (id) {
          const response = await getMembers(+id);
          console.log(response);
          response && setMembers(response);
        }
      } catch (error) {
        return new Error("error fetch worker");
      }
    };

    fetchMembers();
  }, [id]);
  return (
    <>
      <div className="text-stone-600 font-bold text-sm lg:text-lg flex justify-center items-center h-14 bg-neutral-100 col-span-2 border-x border-t border-neutral-300">
        담당 회원
      </div>
      <div className="col-span-2 border border-neutral-300 rounded-b-lg h-[40vh] overflow-y-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="sticky top-0 bg-stone-100 font-semibold text-lg text-center *:py-3">
              <td>이름</td>
              <td>연락처</td>

              <td>
                <select className="bg-transparent outline-none focus:outline-none">
                  <option>요일</option>
                  <option>월</option>
                  <option>화</option>
                  <option>수</option>
                  <option>목</option>
                  <option>금</option>
                  <option>토</option>
                  <option>일</option>
                </select>
              </td>
              <td className="flex justify-center items-center">등록일</td>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, index) => ({
              name: `이름 ${index + 1}`,
              phone: "010-0000-0000",
              worker: "함코치",
              regDate: "2024.01.01.",
              dayOfWeek: "월 수",
              pay: Math.floor(Math.random() * 3) - 1,
            })).map((item, index) => (
              <tr
                key={index}
                onClick={() => router.push(`/member/${index}`)}
                className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
              >
                <td>{item.name}</td>
                <td>{item.phone}</td>

                <td>{item.dayOfWeek}</td>
                <td>{item.regDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Members;
