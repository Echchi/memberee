export const ID_REGEX = new RegExp(/^[a-z]+[a-z0-9]{5,19}$/g);
export const ID_REGEX_ERROR = "아이디는 영문자 또는 숫자 6 ~ 10 글자여야해요";
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);

export const CO_NUM_REGEX = new RegExp(/^\d{10}$/);

export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자, 대문자, 특수문자를 포함해야해요";

export const BIRTH_REGEX = new RegExp(
  /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
);
export const BIRTH_REGEX_ERROR = "생년월일을 숫자 여덟자로 입력해주세요";

export const STARTDATE_REGEX = new RegExp(
  /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
);
export const STARTDATE_REGEX_ERROR = "시작일자를 숫자 여덟자로 입력해주세요";

export const ONLY_NUMBER_REGEX = new RegExp(/^\d+$/);

export const ONLY_NUMBER_REGEX_ERROR = "숫자로만 입력해주세요";
