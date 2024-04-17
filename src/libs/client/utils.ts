import { format, isValid, parse, parseISO } from "date-fns";
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

export function formatISODate(date: string | Date | null | undefined): string {
  if (typeof date === "string") {
    const parsedDate = parseISO(date);
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  } else if (date instanceof Date) {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  }
  return "";
}
export function formatKorDate(date: string) {
  const tmp = parse(date, "yyyyMMdd", new Date());
  return format(tmp, "yyyy년 MM월 dd일");
}

export function formatPhone(phoneNumber: string) {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}
