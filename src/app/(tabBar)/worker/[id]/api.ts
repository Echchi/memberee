"use server";
import db from "@/libs/server/db";

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
