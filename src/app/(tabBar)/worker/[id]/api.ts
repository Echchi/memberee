import db from "@/libs/server/db";

export async function getWorker(id: number) {
  const worker = await db.worker.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      birth: true,
      startDate: true,
      commission: true,
      bank: true,
      accountNumber: true,
      dayOfWeek: true,
      phone: true,
      WorkerMemos: true,
      Schedule: true,
    },
  });
  console.log("worker", worker);
  return worker;
}
