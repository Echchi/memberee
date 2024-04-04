import { parse } from "date-fns";
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
