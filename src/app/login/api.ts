"use server";
import db from "@/libs/server/db";
import { Resend } from "resend";
import React from "react";
import FindPasswordEmail from "../../../emails/find-password-email";

export interface FindParam {
  phone: string;
  coNum: string;
  name?: string;
  id?: string;
}

export async function getUserWithData(param: FindParam) {
  const { phone, coNum, name, id } = param;
  const whereClause: any = {
    phone: phone,
    status: { in: [-1, 1] },
    Company: {
      some: {
        num: coNum,
      },
    },
  };

  if (name) {
    whereClause.name = name;
  }

  if (id) {
    whereClause.userid = id;
  }

  const userId = await db.user.findFirst({
    where: whereClause,
    select: { userid: true, createdAt: true, email: true, name: true },
  });

  return userId;
}

export async function getUserWithId(id: string) {
  const userId = await db.user.findFirst({
    where: {
      userid: id,
      status: { in: [-1, 1] },
    },
    select: { userid: true, email: true },
  });

  return userId;
}

interface Email {
  to: string[]; // An array of email addresses to which to send the email.
  subject: string; // The subject of the email.
  react: React.ReactElement; // The body of the email as a React element.
}

export const sendEmail = async (payload: Email) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "memberee <memberee@memberee.com>",
    ...payload,
  });

  if (error) {
    console.error("Error sending email", error);
    return null;
  }

  return true;
};

interface SendPasswordEmail {
  email: string;
  name: string;
  tmpPassword: string;
}

export const sendPasswordEmail = async (param: SendPasswordEmail) => {
  const { email, name, tmpPassword } = param;
  const res = await sendEmail({
    to: [email],
    subject: `${name} 님! memberee 임시 비밀번호 입니다 `,
    react: React.createElement(FindPasswordEmail, {
      tmpPassword,
      name: name,
    }),
  });
  return res ? { success: true } : { success: false };
};
