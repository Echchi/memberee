export const ID_REGEX = new RegExp(/^[a-z]+[a-z0-9]{5,19}$/g);
export const ID_REGEX_ERROR = "아이디는 영문자 또는 숫자 6 ~ 10 글자여야해요";
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);

export const CO_NUM_REGEX = new RegExp(/^\d{10}$/);

export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자, 대문자, 특수문자를 포함해야해요";
