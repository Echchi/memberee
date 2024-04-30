"use server";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";

export async function getClasses(id: number, year: number, month: number) {
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  console.log("날짜", year, month);
  console.log("company", company?.payDay);
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
                gte: new Date(year, month - 1, company?.payDay),
              },
            },
            {
              status: -1,
              suspendedDate: {
                gte: new Date(year, month - 1, company?.payDay),
              },
            },
          ],
        },
      ],
    },
    select: {
      id: true,
    },
  });
  console.log("memberr", members);
  console.log(
    "new Date(year, month, company?.payDay)",
    new Date(year, month - 1, company?.payDay),
  );
  console.log(
    "new Date(year, month, company?.payDay)????",
    new Date(2024, 5, 2).toLocaleDateString(),
  );
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
