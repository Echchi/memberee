"use server";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";
import { getMonth, getYear } from "date-fns";

export async function getClasses(options: {
  id?: number;
  year?: number;
  month?: number;
  dayOfWeek?: number;
}) {
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  const payDayDate = new Date(
    Date.UTC(
      options.year || getYear(new Date()),
      options.month || getMonth(new Date()) - 1,
      company?.payDay,
    ),
  );
  // // console.log("~~~~~~~~~~", options, companyId);
  // const members = await db.member.findMany({
  //   where: {
  //     companyId: companyId,
  //     AND: [
  //       {
  //         Payment: {
  //           none: {
  //             lessonFee: -1,
  //             forYear: options.year,
  //             forMonth: options.month,
  //           },
  //         },
  //       },
  //       {
  //         OR: [
  //           {
  //             status: 1,
  //           },
  //           {
  //             status: 0,
  //             endDate: {
  //               gte: payDayDate,
  //             },
  //           },
  //           {
  //             status: -1,
  //             suspendedDate: {
  //               gte: payDayDate,
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // });
  // // console.log("members", members);
  const classes = await db.schedule.findMany({
    where: {
      ...(options.id && { workerId: options.id }),
      // ...(options.dayOfWeek && { dayOfWeek: options.dayOfWeek }),

      // memberId: {
      //   in: members.map((m) => m.id), // 조회된 memberId 사용
      // },

      member: {
        companyId: companyId,
        // AND: [
        //   {
        //     Payment: {
        //       none: {
        //         lessonFee: -1,
        //         forYear: options.year,
        //         forMonth: options.month,
        //       },
        //     },
        //   },
        //   {
        //     OR: [
        //       {
        //         status: 1,
        //       },
        //       {
        //         status: 0,
        //         endDate: {
        //           gte: payDayDate,
        //         },
        //       },
        //       {
        //         status: -1,
        //         suspendedDate: {
        //           gte: payDayDate,
        //         },
        //       },
        //     ],
        //   },
        // ],
      },
    },
    include: {
      member: true,
      worker: true,
    },
  });
  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  return classes || [];
}
