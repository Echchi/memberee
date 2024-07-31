import { atom, selector } from "recoil";
import { PaymentType } from "@prisma/client";

export const paymentState = atom({
  key: "paymentTypeState",
  default: "Different",
});

export const payDayState = atom({
  key: "payDayState",
  default: null,
});
