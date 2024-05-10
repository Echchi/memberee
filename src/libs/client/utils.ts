import {
  addMonths,
  format,
  getMonth,
  getYear,
  isValid,
  parse,
  parseISO,
  subMonths,
} from "date-fns";
import {
  DAYOFWEEK,
  DAYOFWEEK_REGEX,
  DAYOFWEEK_TONUM,
  TIMEDATA_REGEX,
} from "@/libs/constants";
import { IMemberWithSchedules } from "@/app/(tabBar)/member/[id]/page";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";

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
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  } else if (date instanceof Date) {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
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

export function combineCurrentDateWithTime(time: string) {
  console.log("time", time);
  const currentDate = new Date();
  const timeParts = time.split(":");
  currentDate.setHours(
    parseInt(timeParts[0], 10),
    parseInt(timeParts[1], 10),
    0,
  ); // 시, 분, 초 설정
  return currentDate;
}

export const dateFormattedtoKor = (date?: Date | null) => {
  return date ? format(date, "yyyy년 MM월 dd일") : "날짜 없음";
};
export const dateFormattedtoNum = (date?: Date | null) => {
  return date ? format(date, "yyyyMMdd") : "날짜 없음";
};
export const dateFormattedtoDot = (date?: Date | null) => {
  return date ? format(date, "yyyy.MM.dd.") : "날짜 없음";
};

export function generatePaymentDates(
  date: Date,
  paymentDay: number,
  includeThisMonth: boolean = true,
  endDate?: Date,
) {
  // console.log("generatePaymentDates", date, paymentDay);
  const currentDate = includeThisMonth ? new Date() : subMonths(new Date(), 1);
  const start = new Date(date);
  const end = endDate ? endDate : new Date(currentDate);

  const initialYear = start.getFullYear();
  const initialMonth = start.getMonth();
  let firstPaymentDate = new Date(initialYear, initialMonth, paymentDay);

  if (firstPaymentDate < start) {
    firstPaymentDate = addMonths(firstPaymentDate, 1);
  }

  const paymentDates = [];

  while (firstPaymentDate <= end) {
    paymentDates.push(format(firstPaymentDate, "yyyyM"));
    firstPaymentDate = addMonths(firstPaymentDate, 1);
  }

  return paymentDates;
}

export const calculateLessonFee = (members: IMemberWithSchedules[]) => {
  return members.reduce((total, member) => {
    const firstLessonFee = member?.Schedule?.[0]?.lessonFee || 0;
    return total + firstLessonFee;
  }, 0);
};

export const calculateSalary = (
  lessonFee: number,
  commission: number | null,
) => {
  const commissionDecimal = (commission || 0) / 100;
  return lessonFee * (1 - commissionDecimal) * (1 - 0.033);
};

export const compareDate = (payDay: number) => {
  const today = new Date();
  const currentDay = today.getDate();
  return currentDay <= payDay;
};

// class

export function calculateGridRowStart(startTime: string, endTime: string) {
  const [hour, minutes] = startTime.split(":").map(Number);
  return Math.floor(minutes / 10) + 1;
}

export function calculateGridRowEnd(startTime: string, endTime: string) {
  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
  return Math.ceil((endMinutes - startMinutes) / 10);
}

export function isAfterYearMonth(date1: Date, date2: Date) {
  const year1 = getYear(date1);
  const month1 = getMonth(date1);
  const year2 = getYear(date2);
  const month2 = getMonth(date2);

  return year1 > year2 || (year1 === year2 && month1 > month2);
}

export function formatDayOfWeekForDatabase(dayOfWeeks: string) {
  const formatDayOfWeek = dayOfWeeks.replace(/\s+/g, "");
  const dayOfWeekArr = formatDayOfWeek.split(",");

  return dayOfWeekArr
    .map((day) => DAYOFWEEK_TONUM[day])
    .sort((a, b) => Number(a) - Number(b))
    .join("");
}

export function scheduleValid(item: string, type: "dayOfWeek" | "time") {
  return item
    ?.split(",")
    .map((day) => day.trim().replace(/\s+/g, ""))
    .filter((item) => item.length > 0)
    .every((day) =>
      type === "dayOfWeek"
        ? DAYOFWEEK_REGEX.test(day)
        : TIMEDATA_REGEX.test(day),
    );
}

export async function getWorkerId(workerName: string) {
  const workerList = await getWorkerList();
  const worker = workerList.find((worker) => worker.name === workerName);
  return worker?.id + "";
}
