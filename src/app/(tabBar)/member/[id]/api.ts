"use server";

import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { MEMO_SLICE_SIZE } from "@/libs/constants";

export async function getMember(id: number, slice: number = 1) {
  const session = await getSession();
  const companyId = session.company;
  const member = await db.member.findUnique({
    where: {
      id: id,
      companyId: companyId,
    },

    include: {
      Memos: {
        take: MEMO_SLICE_SIZE,
        skip: (slice - 1) * MEMO_SLICE_SIZE,
        orderBy: {
          createdAt: "desc",
        },
      },
      Schedule: true,
      worker: true,
      Payment: true,
      company: true,
    },
  });
  // console.log("member", member);
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

export async function getMemos(id: number, slice: number = 1) {
  const memos = await db.memo.findMany({
    where: {
      memberId: id,
    },
    take: MEMO_SLICE_SIZE,
    skip: (slice - 1) * MEMO_SLICE_SIZE,
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log("memos", memos);
  return memos;
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
  workerId: number,
  year: string,
  month: string,
) => {
  const updateStopPeriodPayment = await db.payment.create({
    data: {
      memberId: id,
      workerId: Number(workerId),
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
