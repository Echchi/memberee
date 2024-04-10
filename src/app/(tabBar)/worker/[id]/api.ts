"use server";
import db from "@/libs/server/db";

export async function getWorker(id: number) {
  const worker = await db.worker.findUnique({
    where: {
      id: id,
    },
  });
  return worker;
}
