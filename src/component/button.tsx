import { cls } from "@/libs/client/utils";

export interface ButtonProps {
  large?: boolean;
  isButtonDisabled?: boolean;
  text: string;
  [key: string]: any;
  printBtn?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  large = false,
  onClick,
  text,
  isButtonDisabled,
  printBtn = false,
  className,
  type,
  ...rest
}: ButtonProps) {
  if (printBtn) {
    return (
      <button
        {...rest}
        onClick={onClick}
        type={type}
        className={cls(
          "outline-none w-full rounded-lg text-white font-semibold transition-all",
          isButtonDisabled
            ? "bg-gray-300 cursor-default"
            : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 cursor-pointer",
          large ? "py-4 text-lg" : "py-2 text-sm px-3",
          className ? className : "",
        )}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        {...rest}
        onClick={onClick}
        type={type}
        className={cls(
          "py-3 text-sm md:text-base outline-none w-full rounded-lg text-white font-semibold transition-all",
          isButtonDisabled
            ? "bg-gray-300 cursor-default"
            : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 cursor-pointer",
          large ? "py-4 text-lg" : "py-2 text-sm ",
          className ? className : "",
        )}
      >
        {text}
      </button>
    );
  }
}
