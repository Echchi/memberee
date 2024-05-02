"use server";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";

export async function getClasses(id: number, year: number, month: number) {
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  const payDayDate = new Date(Date.UTC(year, month - 1, company?.payDay));
  const members = await db.member.findMany({
    where: {
      companyId: companyId,
      AND: [
        {
          Payment: {
            none: {
              lessonFee: -1,
              forYear: year,
              forMonth: month,
            },
          },
        },
        {
          OR: [
            {
              status: 1,
            },
            {
              status: 0,
              endDate: {
                gte: payDayDate,
              },
            },
            {
              status: -1,
              suspendedDate: {
                gte: payDayDate,
              },
            },
          ],
        },
      ],
    },
    // select: {
    //   id: true,
    // },
  });
  console.log("members", members);
  const classes = await db.schedule.findMany({
    where: {
      workerId: id,
      memberId: {
        in: members.map((m) => m.id), // 조회된 memberId 사용
      },
    },
    include: {
      member: true,
    },
  });

  return classes;
}
