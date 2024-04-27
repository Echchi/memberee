"use server";
import React from "react";
import Link from "next/link";
import db from "@/libs/server/db";
import { getWorkers } from "@/component/page/worker/workers";
import { DAYOFWEEK } from "@/libs/constants";
import { dateFormattedtoKor } from "@/libs/client/utils";
import getSession from "@/libs/client/session";
import Member from "./member";
import LineBox from "@/component/lineBox";
import MemberMb from "./member_mb";
export async function getMembers(
  query: string,
  year?: number,
  month?: number,
  isPay: boolean = false,
) {
  const session = await getSession();
  const companyId = session.company;
  const members = await db.member.findMany({
    where: {
      status: {
        in: [1, -1],
      },
      companyId: companyId,
      ...(query && {
        OR: [
          {
            name: {
              contains: query.toLowerCase(),
            },
          },
          {
            phone: {
              contains: query.toLowerCase(),
            },
          },
        ],
      }),
    },
    orderBy: [{ status: "desc" }],
    include: {
      Schedule: true,
      worker: true,
      Payment: {
        where: {
          ...(year && { forYear: year }),
          ...(month && { forMonth: month }),
        },
      },
    },
  });
  return members;
}
const Members = async ({
  query,
  setDesc,
}: {
  query?: string;
  setDesc?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const members = await getMembers(query || "");

  return (
    <>
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
                <td className="flex justify-center items-center">
                  등록일
                  <svg
                    // onClick={() => setDesc((prev) => !prev)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </td>
              </tr>
            </thead>
            <tbody>
              {members &&
                members.map((member, index) => (
                  <Member member={member} key={member.id} />
                  // <tr
                  //   key={index}
                  //   className="*:py-3 text-center border-b border-stone-100 hover:bg-orange-100 cursor-pointer active:bg-orange-200"
                  // >
                  //   {/*<Link key={member.id} href={`member/${member.id}`}>*/}
                  //   <td>{member.name}</td>
                  //   <td>{member.phone}</td>
                  //   <td>{member.worker.name}</td>
                  //   <td>
                  //     {member.Schedule.map(
                  //       (item, index) => DAYOFWEEK[item.dayOfWeek],
                  //     )}
                  //   </td>
                  //   <td>{dateFormattedtoKor(member?.createdAt)}</td>
                  //   {/*</Link>*/}
                  // </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:hidden flex flex-col space-y-3 mt-5">
        {members &&
          members.map((member, index) => (
            <MemberMb member={member} key={member.id} />
          ))}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 2"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
        {/*<LineBox*/}
        {/*  worker={"함코치"}*/}
        {/*  day={"월, 수"}*/}
        {/*  name={"회원 1"}*/}
        {/*  phone={"010-0000-0000"}*/}
        {/*  pay={true}*/}
        {/*/>*/}
      </div>
    </>
  );
};

export default Members;
