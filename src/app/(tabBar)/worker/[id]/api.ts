"use server";
import session from "@/libs/client/session";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { formatISODate } from "@/libs/client/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getWorker(id: number, month?: string, year?: string) {
  const session = await getSession();
  const companyId = session.company;
  const worker = await db.worker.findUnique({
    where: {
      id: id,
      companyId: companyId,
    },
    include: {
      Member: {
        where: {
          status: { in: [-1, 1] },
        },
        include: {
          Schedule: true,
        },
      },
      WorkerMemos: true,
    },
  });
  return worker;
}

// export async function getMembers(id: number) {
//   const members = await db.member.findMany({
//     where: {
//       workerId: id,
//       status: { in: [-1, 1] },
//     },
//   });
//   return members;
// }

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
  redirect("/worker");
}

export const createWorkerMemo = async (id: string, content: string) => {
  const createWorkerMemo = await db.workerMemo.create({
    data: {
      workerId: +id!,
      content,
    },
  });

  redirect(`${id}`);
};

export const updateWorkerMemo = async (id: number, content: string) => {
  const updateWorkerMemo = await db.workerMemo.update({
    where: {
      id: id!,
    },
    data: {
      content,
    },
    select: {
      workerId: true,
    },
  });
  redirect(`${updateWorkerMemo.workerId}`);
};
export const deleteWorkerMemo = async (id: number) => {
  const deleteWorkerMemo = await db.workerMemo.delete({
    where: {
      id: id!,
    },
  });
};
