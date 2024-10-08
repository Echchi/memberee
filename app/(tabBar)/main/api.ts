"use server";
import db from "../../../libs/server/db";
import getSession from "../../../libs/client/session";
import { getCompany } from "../pay/[id]/api";
import { getMonth, getYear } from "date-fns";
import { redirect } from "next/navigation";

export async function getTotalCnt(year?: number, month?: number) {
  console.log("~~~~~~~~~ getTotalCnt", year, month);
  const session = await getSession();
  const companyId = session.company;
  const company = await getCompany();
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
      company?.payDay ? company?.payDay : 1,
    ),
  );
  const totalCnt = await db.member.count({
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
  });
  console.log("~~~~~~~~~ getTotalCnt Result", totalCnt);
  return totalCnt;
}

export const getPaidCnt = async (year?: number, month?: number) => {
  console.log("~~~~~~~~~ getPaidCnt", year, month);
  const session = await getSession();
  const companyId = session.company;
  const paids = await db.payment.count({
    where: {
      ...(year && { forYear: year }),
      ...(month && { forMonth: month }),
      lessonFee: { not: -1 },
      companyId: companyId,
    },
  });
  console.log("~~~~~~~~~ getPaidCnt Result", paids);
  return paids;
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("login");
};

export const getPaymentType = async () => {
  const session = await getSession();
  return session.paymentType;
};
