// "use server";
import React from "react";

import PayList from "@/component/page/pay/payList";
import PayHeader from "@/component/page/pay/payHeader";
import { getMonth, getYear } from "date-fns";
import MonthChanger from "@/component/monthChanger";
import Pay from "@/component/page/pay/pay";
import Pagination from "@/component/pagination";
import Empty from "@/component/empty";
import PayMb from "@/component/page/pay/pay_mb";
import { getMembers } from "@/app/(tabBar)/pay/api";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";
import { getPaidCnt, getTotalCnt } from "@/app/(tabBar)/main/api";

const Page = async ({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string; month?: string };
}) => {
  const query = searchParams?.query || "";
  const year = Number(searchParams?.year || getYear(new Date()));
  const month = Number(searchParams?.month || getMonth(new Date()) + 1);
  // const { members, total } = await getMembers({
  //   params: {
  //     query: query || "",
  //     year,
  //     month,
  //     workerId,
  //     payStatus,
  //     page,
  //   },
  // });
  // const workers = await getWorkerList();
  // const paidCnt = await getPaidCnt(year, month);
  // const totalCnt = await getTotalCnt(year, month);

  return (
    <>
      <MonthChanger />
      <PayHeader year={year} month={month} />
      <PayList query={query} year={year} month={month} />
      {/*<>*/}
      {/*  <div className="hidden xl:block box mt-3">*/}
      {/*    <div className="w-full">*/}
      {/*      <p className="text-right mb-2">{`${paidCnt} 명 납부 / 총 ${totalCnt} 명`}</p>*/}

      {/*      <table className="w-full table-auto">*/}
      {/*        <thead>*/}
      {/*          <tr className="bg-stone-100 font-semibold text-lg text-center *:py-3">*/}
      {/*            <td>이름</td>*/}
      {/*            <td>연락처</td>*/}
      {/*            <td>*/}
      {/*              <select*/}
      {/*                className="bg-transparent outline-none focus:outline-none cursor-pointer"*/}
      {/*                onChange={(e) => handleChangeWorkerList(e)}*/}
      {/*              >*/}
      {/*                <option value={-1}>담당</option>*/}
      {/*                {workers &&*/}
      {/*                  workers.map((worker) => (*/}
      {/*                    <option*/}
      {/*                      key={`payment_workerList_${worker.id}`}*/}
      {/*                      value={worker.id}*/}
      {/*                    >*/}
      {/*                      {worker.name}*/}
      {/*                    </option>*/}
      {/*                  ))}*/}
      {/*              </select>*/}
      {/*            </td>*/}
      {/*            <td>수강료</td>*/}
      {/*            <td>*/}
      {/*              <select*/}
      {/*                className="bg-transparent outline-none focus:outline-none cursor-pointer"*/}
      {/*                onChange={(e) => handleChangePay(e)}*/}
      {/*              >*/}
      {/*                <option value={0}>납부여부</option>*/}
      {/*                <option value={1}>납부</option>*/}
      {/*                <option value={-1}>미납</option>*/}
      {/*              </select>*/}
      {/*            </td>*/}
      {/*            /!*<td className="w-24">연체여부</td>*!/*/}
      {/*          </tr>*/}
      {/*        </thead>*/}
      {/*        <tbody>*/}
      {/*          {members*/}
      {/*            ? members.map((member, index) => (*/}
      {/*                <Pay key={`pay_${member.id}`} member={member} />*/}
      {/*              ))*/}
      {/*            : [...Array(10)].map((_, index) => (*/}
      {/*                <tr*/}
      {/*                  key={`payList_loading_${index}`}*/}
      {/*                  className="w-full *:h-14 *:rounded"*/}
      {/*                >*/}
      {/*                  <td>*/}
      {/*                    <div className="flex justify-center items-center">*/}
      {/*                      <span className="w-2/3 skeleton rounded-lg h-8" />*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                  <td>*/}
      {/*                    <div className="flex justify-center items-center">*/}
      {/*                      <span className="w-full skeleton rounded-lg h-8" />*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                  <td>*/}
      {/*                    <div className="flex justify-center items-center">*/}
      {/*                      <span className="w-1/2 skeleton rounded-lg h-8" />*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                  <td>*/}
      {/*                    <div className="flex justify-center items-center">*/}
      {/*                      <span className="w-1/2 skeleton rounded-lg h-8" />*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                  <td>*/}
      {/*                    <div className="flex justify-center items-center">*/}
      {/*                      <span className="w-1/3 skeleton rounded-lg h-8" />*/}
      {/*                    </div>*/}
      {/*                  </td>*/}
      {/*                </tr>*/}
      {/*              ))}*/}
      {/*        </tbody>*/}
      {/*      </table>*/}
      {/*      <Pagination total={total || 0} page={page} setPage={setPage} />*/}
      {/*      {members && members.length === 0 && <Empty item={"납부 내역"} />}*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className="xl:hidden flex flex-col space-y-3 mt-5">*/}
      {/*    <PayMb*/}
      {/*      members={members || []}*/}
      {/*      payStatus={payStatus}*/}
      {/*      setPayStatus={setPayStatus}*/}
      {/*      setSlice={setPage}*/}
      {/*      // loading={loading}*/}
      {/*      query={query}*/}
      {/*      year={year || 0}*/}
      {/*      month={month || 0}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</>*/}
    </>
  );
};

export default Page;
