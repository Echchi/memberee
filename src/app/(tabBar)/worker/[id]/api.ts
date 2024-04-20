"use server";
import session from "@/libs/client/session";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { formatISODate } from "@/libs/client/utils";

export async function getWorker(id: number) {
  const worker = await db.worker.findUnique({
    where: {
      id: id,
    },
    include: {
      Member: true,
      WorkerMemos: true,
    },
  });
  return worker;
}

export async function getMembers(id: number) {
  const members = await db.member.findMany({
    where: {
      workerId: id,
    },
  });
  return members;
}

export async function terminateWorker(id: number) {
  const session = await getSession();
  const companyId = session.company;
  const worker = await db.worker.update({
    where: {
      id,
      companyId,
    },
    data: {
      status: 0,
    },
  });
}
