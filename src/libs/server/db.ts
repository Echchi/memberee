import { PrismaClient } from "@prisma/client";
declare global {
  var client: PrismaClient | undefined;
}

const db = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = db;
export default db;
