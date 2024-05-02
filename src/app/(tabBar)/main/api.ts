"use server";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { getCompany } from "@/app/(tabBar)/pay/[id]/api";
import { getMonth, getYear } from "date-fns";

export const getPaidCnt = async (year?: number, month?: number) => {
  const paids = await db.payment.count({
    where: {
      ...(year && { forYear: year }),
      ...(month && { forMonth: month }),
      // lessonFee: { not: -1 },
    },
  });

  return paids;
};

export const getTotalMemCnt = async (year?: number, month?: number) => {
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
  const payDayDate = new Date(
    Date.UTC(
      year || getYear(new Date()),
      (month || getMonth(new Date())) - 1,
      company?.payDay,
    ),
  );

  const members = await db.member.findMany({
    where: {
      companyId: companyId,
      AND: [
        ...(year && month
          ? [
              {
                OR: [
                  {
                    AND: [
                      { status: 0 },
                      {
                        OR: [
                          { endDate: null },
                          {
                            endDate: {
                              gte: payDayDate,
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    status: {
                      not: 0,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    },

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
};
