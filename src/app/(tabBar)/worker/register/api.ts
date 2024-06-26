"use server";

import getSession from "@/libs/client/session";
import db from "@/libs/server/db";

export async function getWorkerList(year?: number, month?: number) {
  const session = getSession();
  const companyId = (await session).company;
  const searchDate = year && month ? new Date(year, month - 1) : new Date();
  const workers = await db.worker.findMany({
    where: {
      companyId,
      OR: [
        { endDate: null },

        ...(year && month
          ? [
              {
                endDate: { lte: searchDate },
              },
            ]
          : []),
      ],
    },
    select: {
      id: true,
      name: true,
      dayOfWeek: true,
      phone: true,
    },
  });

  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  console.log("workers", workers);
  return workers;
}
