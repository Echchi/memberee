"use server";

import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getMember(id: number) {
  const member = await db.member.findUnique({
    where: {
      id: id,
    },

    include: {
      Memos: true,
      Schedule: true,
      worker: true,
      Payment: true,
      company: true,
    },
  });
  console.log("member", member);
  return member;
}

export async function changeStatusMember(id: number, status: -1 | 0 | 1) {
  const session = await getSession();
  const companyId = session.company;
  const updateData = {
    status: status,
    ...(status < 0 && { suspendedDate: new Date() }),
    ...(status === 0 && { endDate: new Date() }),
  };
  const member = await db.member.update({
    where: {
      id,
      companyId,
    },
    data: updateData,
  });
  if (member.status === 0) {
    redirect("/member");
  } else {
    redirect(`${id}`);
  }
}

export const createMemberMemo = async (id: string, content: string) => {
  const createMemberMemo = await db.memo.create({
    data: {
      memberId: +id!,
      content,
    },
  });

  redirect(`${id}`);
};

export const updateMemberMemo = async (id: number, content: string) => {
  const updateMemberMemo = await db.memo.update({
    where: {
      id: id!,
    },
    data: {
      content,
    },
    select: {
      memberId: true,
    },
  });
  redirect(`${updateMemberMemo.memberId}`);
};
export const updateStopPeriodPayment = async (
  id: number,
  year: string,
  month: string,
) => {
  const updateStopPeriodPayment = await db.payment.create({
    data: {
      memberId: id,
      forYear: Number(year),
      forMonth: Number(month),
      lessonFee: -1,
      memo: "중단",
    },
    select: {
      memberId: true,
    },
  });
  redirect(`${updateStopPeriodPayment?.memberId}`);
};

export const deleteMemberMemo = async (id: number) => {
  const deleteMemberMemo = await db.memo.delete({
    where: {
      id: id!,
    },
  });
};
