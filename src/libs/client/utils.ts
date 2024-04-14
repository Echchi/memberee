import { format, parse } from "date-fns";
import { DAYOFWEEK } from "@/libs/constants";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
export function formatCurrency(currency: string | number) {
  if (typeof currency === "string") {
    currency = currency + "";
  }
  return currency.toLocaleString("ko-KR");
  // return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDateTime(date: string) {
  let res;
  if (typeof date === "string") {
    res = parse(date, "yyyyMMdd", new Date());
  }
  return res;
}
export function formatKorDate(date: string) {
  let res;
  if (typeof date === "string") {
    const tmp = parse(date, "yyyyMMdd", new Date());
    res = format(tmp, "yyyy년 MM월 dd일");
  }
  return res;
}

export function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}
