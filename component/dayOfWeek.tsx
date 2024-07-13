import { DAYOFWEEK } from "../libs/constants";

export function DayOfWeek(dayOfWeek: string) {
  if (dayOfWeek.length === 0) return;

  return dayOfWeek
    .split("")
    .map((day, index) => (
      <span key={`dayofweek_${index}`}>{DAYOFWEEK[+day]}</span>
    ));
}
