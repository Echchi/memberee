"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { cls } from "@/libs/client/utils";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <div className="hidden xl:block box mt-3">
        <div className="w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">
                <td>이름</td>
                <td>연락처</td>
                <td>담당</td>
                <td>등록일</td>
                <td>납부</td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, index) => ({
                name: `이름 ${index + 1}`,
                phone: "010-0000-0000",
                worker: "함코치",
                regDate: "2024.01.01.",
                pay: index % 3 === 0,
              })).map((item, index) => (
                <tr
                  key={index}
                  onClick={() => router.push(`member/${index}`)}
                  className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
                >
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.worker}</td>
                  <td>{item.regDate}</td>
                  <td>{item.pay ? "2024.01.17." : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:hidden flex flex-col space-y-3 mt-5">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Tag color={"orange"} title={"미납"} />
            <Tag color={"stone"} title={"납부완료"} />
          </div>
        </div>
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={false}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={false}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 2"}
          phone={"010-0000-0000"}
          pay={false}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
      </div>
    </>
  );
};

export default Page;
