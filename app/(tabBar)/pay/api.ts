"use server";
import getSession from "../../../libs/client/session";
import { getCompany } from "./[id]/api";
import { getMonth, getYear } from "date-fns";
import db from "../../../libs/server/db";
import { PAGESIZE } from "../../../libs/constants";
import { isAfterYearMonth } from "../../../libs/client/utils";
import { getMembersParams } from "../member/api";

export async function getMembers({
  params,
  year,
  month,
}: {
  params: getMembersParams;
  year: number;
  month: number;
}) {
  // console.time("Server: getMembers total time");
  console.log("getMembers params ", params);
  console.log("year month ", year, month);
  const {
    query,
    workerId,
    dayOfWeek,

    payDayOrder,
    payStatus,
    page = 1,
    isAll = false,
  } = params;

  // console.time("Server: getSession");
  const session = await getSession();
  // console.timeEnd("Server: getSession");

  // console.time("Server: getCompany");
  const companyId = session.company;
  const company = await getCompany();
  // console.timeEnd("Server: getCompany");

  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date()) + 1;
  const startDate = new Date(
    Date.UTC(year || thisYear, (month || thisMonth) - 1, 1),
  ); // 해당 월의 시작일
  const endDate = new Date(Date.UTC(year || thisYear, month || thisMonth, 0));
  const payDayDate = new Date(
    Date.UTC(
      year || getYear(new Date()),
      (month || getMonth(new Date())) - 1,
      company?.payDay || 1,
    ),
  );

  const whereClause = {
    companyId: companyId,
    AND: [
      ...(query
        ? [
            {
              OR: [
                { name: { contains: query.toLowerCase() } },
                { phone: { contains: query.toLowerCase() } },
              ],
            },
          ]
        : []),
      ...(year && month
        ? [
            {
              OR: [
                { status: { not: 0 } },
                { AND: [{ status: 0 }, { endDate: { gte: payDayDate } }] },
              ],
            },
          ]
        : []),
      ...(workerId && workerId > 0 ? [{ workerId: workerId }] : []),
      ...(dayOfWeek && dayOfWeek > 0
        ? [{ Schedule: { some: { dayOfWeek: dayOfWeek } } }]
        : []),
      ...(payStatus && payStatus > 0
        ? [
            {
              Payment: {
                some: {
                  ...(year && { forYear: year }),
                  ...(month && { forMonth: month }),
                  lessonFee: { gte: 0 },
                },
              },
            },
          ]
        : payStatus === 0
          ? []
          : [
              {
                Payment: {
                  none: {
                    ...(year && { forYear: year }),
                    ...(month && { forMonth: month }),
                  },
                },
              },
            ]),
    ],
  };

  // console.time("pay query");
  const [members, total] = await Promise.all([
    db.member.findMany({
      where: whereClause,
      skip: isAll ? undefined : (page - 1) * PAGESIZE,
      take: isAll ? undefined : PAGESIZE,
      orderBy: [{ payDay: payDayOrder ? "desc" : "asc" }],
      include: {
        Schedule: true,
        worker: true,
        Payment: {
          where: {
            ...(year && { forYear: year }),
            ...(month && { forMonth: month }),
          },
          orderBy: {
            lessonFee: "desc",
          },
        },
        WorkerChangeLog: {
          where: {
            changedDate: {
              lt: endDate,
            },
          },
          orderBy: {
            changedDate: "desc",
          },
          take: 1,
        },
      },
    }),
    db.member.count({ where: whereClause }),
  ]);
  // console.timeEnd("pay query");

  // console.time("pay data format");
  const formattedMembers = members.map((member) => {
    const latestWorkerLog = member.WorkerChangeLog[0];
    if (latestWorkerLog) {
      if (isAfterYearMonth(latestWorkerLog.changedDate, startDate)) {
        member.worker.id = latestWorkerLog.previousWorkerId;
      } else {
        member.worker.id = latestWorkerLog.workerId;
      }
    }
    return member;
  });
  // console.timeEnd("pay data format");

  // console.timeEnd("Server: getMembers total time");

  return { members: formattedMembers, total };
}
