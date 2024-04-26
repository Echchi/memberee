"use server";

import db from "@/libs/server/db";

export async function getMember(id: number) {
  const member = await db.member.findUnique({
    where: {
      id: id,
    },

    include: {
      Memos: true,
      Schedule: true,
      worker: true,
    },
  });
  console.log("member", member);
  return member;
}
