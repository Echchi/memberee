"use server";

import getSession from "@/libs/client/session";
import db from "@/libs/server/db";

export async function getWorkerList() {
  const session = getSession();
  const companyId = (await session).company;
  const workers = await db.worker.findMany({
    where: {
      status: 1,
      companyId,
    },
    select: {
      id: true,
      name: true,
      dayOfWeek: true,
      phone: true,
    },
  });
  // // console.log("workers", workers);
  return workers;
}
