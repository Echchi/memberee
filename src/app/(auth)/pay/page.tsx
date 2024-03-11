"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cls } from "@/libs/client/utils";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";
import Input from "@/component/input";
import IcFinder from "../../../../public/icons/ic_finder.svg";
import Image from "next/image";
import { add, addMonths, format } from "date-fns";
import Button from "@/component/button";
import MonthChanger from "@/component/monthChanger";

const Page = () => {
  const router = useRouter();
  const today = new Date();
  const [desc, setDesc] = useState(true);
  const [selectedTag, setSelectedTag] = useState(["미납", "납부완료"]);
  const [month, setMonth] = useState(today);

  const selectTag = (tag: string) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag((prev) => prev.filter((item) => item != tag));
    } else {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };

  return (
    <>
      <MonthChanger month={month} setMonth={setMonth} />
      <div className="my-3 flex justify-between">
        <Input
          type="text"
          placeholder="회원 이름, 연락처, 담당"
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
          className="rounded-xl border-0 h-12 bg-stone-100 w-full lg:w-1/2"
        />
        <div className="hidden lg:block w-1/12">
          <Button text={"출력"} className="py-3" />
        </div>
      </div>

      <div className="hidden lg:block box mt-3">
        <div className="w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">
                <td>이름</td>
                <td>연락처</td>
                <td>
                  <select className="bg-transparent outline-none focus:outline-none">
                    <option>담당</option>
                    <option>함코치</option>
                    <option>이코치</option>
                    <option>장코치</option>
                  </select>
                </td>

                <td>
                  <select className="bg-transparent outline-none focus:outline-none">
                    <option>납부여부</option>
                    <option>납부</option>
                    <option>미납</option>
                    <option>중단</option>
                  </select>
                </td>
                <td className="w-24">연체여부</td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, index) => ({
                name: `이름 ${index + 1}`,
                phone: "010-0000-0000",
                worker: "함코치",
                regDate: "2024.01.01.",
                pay: Math.floor(Math.random() * 3) - 1,
              })).map((item, index) => (
                <tr
                  key={index}
                  onClick={() => router.push(`pay/${index}`)}
                  className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
                >
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.worker}</td>

                  <td className="flex justify-center items-center">
                    {item.pay < 0 ? (
                      <span className="text-xs">
                        <Tag color={"yellow"} title={"중단"} />
                      </span>
                    ) : item.pay < 1 ? (
                      <span className="text-xs">
                        <Tag color={"orange"} title={"미납"} />
                      </span>
                    ) : (
                      <span className="text-xs">
                        <Tag color={"emerald"} title={"납부"} />
                      </span>
                    )}
                  </td>
                  <td>
                    {item.pay < 0 ? (
                      <div className="flex justify-center items-center">
                        <span className="text-xs">
                          <Tag color={"orange"} title={"연체"} />
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:hidden flex flex-col space-y-3 mt-5">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Tag
              color={"orange"}
              noBg={!selectedTag.includes("미납")}
              title={"미납"}
              onClick={() => selectTag("미납")}
            />
            <Tag
              color={"stone"}
              noBg={!selectedTag.includes("납부완료")}
              title={"납부완료"}
              onClick={() => selectTag("납부완료")}
            />
          </div>
        </div>
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={false}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={false}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 2"}
          phone={"010-0000-0000"}
          pay={false}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
          worker={"함코치"}
          day={"월, 수"}
          name={"회원 1"}
          phone={"010-0000-0000"}
          pay={true}
        />
        <LineBox
          onClick={() => router.push("/pay/1")}
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
