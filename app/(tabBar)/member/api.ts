"use server";
import getSession from "../../../libs/client/session";
import db from "../../../libs/server/db";
import { getCompany } from "../pay/[id]/api";
import { getMonth, getYear } from "date-fns";
import { isAfterYearMonth } from "../../../libs/client/utils";
import { PAGESIZE } from "../../../libs/constants";

export interface getMembersParams {
  query: string;
  year?: number;
  month?: number;
  workerId?: number;
  dayOfWeek?: number;
  startDateOrder?: boolean;
  payDayOrder?: boolean;
  page?: number;
  payStatus?: number;
  isAll?: boolean;
  payDay?: number;
}

export async function getMembers({ params }: { params: getMembersParams }) {
  const {
    query,
    year,
    month,
    workerId,
    dayOfWeek,
    startDateOrder,
    payStatus,
    page = 1,
    isAll = false,
    payDay = -1,
  } = params;

  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  const paymentType = session.paymentType;
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
      ...(payDay && payDay > 0 ? [{ payDay: payDay }] : []),
    ],
  };

  const members = await db.member.findMany({
    where: whereClause,
    skip: isAll ? undefined : (page - 1) * PAGESIZE,
    take: isAll ? undefined : PAGESIZE,
    orderBy: [{ startDate: startDateOrder ? "desc" : "asc" }],
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
  });

  const total = await db.member.count({ where: whereClause });

  const formattedMembers = members.map((member) => {
    const latestWorkerLog = member.WorkerChangeLog[0];
    const workerToUse = latestWorkerLog
      ? isAfterYearMonth(latestWorkerLog.changedDate, startDate)
        ? {
            ...member,
            worker: { ...member.worker, id: latestWorkerLog.previousWorkerId },
          }
        : {
            ...member,
            worker: { ...member.worker, id: latestWorkerLog.workerId },
          }
      : member;
    return workerToUse;
  });

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return { members: formattedMembers, total };
}
