export const ID_REGEX = new RegExp(/^[a-z]+[a-z0-9]{4,10}$/g);
export const ID_REGEX_ERROR = "영문자 또는 숫자 4 ~ 10 글자여야해요";
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/,
);

export const NAME_REGEX = new RegExp(/^[a-zA-Z가-힣]{2,}$/);
export const NAME_REGEX_ERROR = "이름을 올바르게 입력해주세요";

export const CO_NUM_REGEX = new RegExp(/^\d{10}$/);

export const PASSWORD_REGEX_ERROR =
  "소문자, 숫자, 특수문자를 포함한 4글자 이상이어야해요";

export const BIRTH_REGEX = new RegExp(
  /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
);
export const BIRTH_REGEX_ERROR = "생년월일을 올바르게 입력해주세요";

export const STARTDATE_REGEX = new RegExp(
  /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
);
export const STARTDATE_REGEX_ERROR = "시작일자를 올바르게 입력해주세요";
export const PAYDATE_REGEX = new RegExp(
  /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
);
export const PAYDATE_REGEX_ERROR = "납부일자를 올바르게 입력해주세요";

export const PHONE_REGEX_ERROR = "연락처를 숫자로만 올바르게 입력해주세요";
export const ONLY_NUMBER_REGEX = new RegExp(/^\d+$/);

export const ONLY_NUMBER_REGEX_ERROR = "숫자로만 입력해주세요";
export const CO_NUM_REGEX_ERROR = "사업자등록번호를 올바르게 입력해주세요";

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

export const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

export const TIME_REGEX_ERROR = "시간을 올바르게 입력해주세요";

export const MONEY_REGEX = /^\d{1,6}$/;
export const MONEY_REGEX_ERROR = "금액을 올바르게 입력해주세요";

export const COMMISSION_REGEX = /^\d{1,3}$/;
export const DAYOFWEEK_REGEX = /요일$/;
export const TIMEDATA_REGEX =
  /^([01]?[0-9]|2[0-3]):[0-5][0-9]~([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
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
