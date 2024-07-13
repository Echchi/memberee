export const DAYOFWEEK: Record<number, string> = {
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
  7: "일",
};
export const DAYOFWEEK_TONUM: Record<string, string> = {
  월요일: "1",
  화요일: "2",
  수요일: "3",
  목요일: "4",
  금요일: "5",
  토요일: "6",
  일요일: "7",
};

export const PAYMENT_METHOD = [
  {
    value: "계좌이체",
    label: "계좌이체",
  },
  {
    value: "카드",
    label: "카드",
  },
  {
    value: "현금",
    label: "현금",
  },
  {
    value: "기타",
    label: "기타",
  },
];

export const PAGESIZE = 10;

export const MEMO_SLICE_SIZE = 7;

export const MEDIAQUERY = "1280px";
