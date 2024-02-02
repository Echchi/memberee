import { cls } from "../libs/utils";

export interface ButtonProps {
  large?: boolean;
  isButtonDisabled?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  isButtonDisabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        "outline-none w-full rounded-lg text-white font-semibold mt-5",
        isButtonDisabled
          ? "bg-gray-300 cursor-default"
          : "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer",
        large ? "py-4 text-lg" : "py-2 text-sm ",
      )}
    >
      {text}
    </button>
  );
}
