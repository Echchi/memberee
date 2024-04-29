"use server";

import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { IPay } from "@/component/page/pay/[id]/list";
import { Payment } from ".prisma/client";
import { formatISODate } from "@/libs/client/utils";
import { Member } from "@prisma/client";

interface ICreatePayment {
  memberId: number;
  forYear: number;
  forMonth: number;
  paymentDate: string;
  lessonFee: number;
  paymentMethod: string;
  memo: string;
}

export async function getCompany() {
  const session = await getSession();
  const companyId = session.company;
  const company = await db.company.findUnique({
    where: {
      id: companyId,
    },
  });

  return company;
}

export const createPay = async (param: ICreatePayment) => {
  const createPay = await db.payment.create({
    data: {
      memberId: param.memberId,
      forYear: Number(param?.forYear),
      forMonth: Number(param?.forMonth),
      paymentDate: formatISODate(param.paymentDate),
      lessonFee: Number(param.lessonFee),
      paymentMethod: param.paymentMethod,
      memo: param.memo,
    },
  });

  redirect(`${param.memberId}`);
};
export const updatePay = async (param: Payment) => {
  const updatePay = await db.payment.update({
    where: { id: param.id },
    data: {
      memberId: param.memberId,
      forYear: Number(param?.forYear),
      forMonth: Number(param?.forMonth),
      paymentDate: formatISODate(param.paymentDate),
      lessonFee: Number(param.lessonFee),
      paymentMethod: param.paymentMethod,
      memo: param.memo,
    },
  });

  redirect(`${param.memberId}`);
};
export const deletePay = async (param: Payment) => {
  const deletePay = await db.payment.delete({
    where: { id: param.id },
  });

  redirect(`${param.memberId}`);
};
