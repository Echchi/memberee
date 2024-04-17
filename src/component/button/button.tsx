"use client";
import { cls } from "@/libs/client/utils";
import { useFormStatus } from "react-dom";

export interface ButtonProps {
  large?: boolean;
  isButtonDisabled?: boolean;
  text: string;
  [key: string]: any;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  large = false,
  onClick,
  text,
  isButtonDisabled,
  className,
  type,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type}
      disabled={type === "submit" && pending}
      className={cls(
        "outline-none w-full rounded-lg text-white font-semibold transition-all disabled:bg-gray-300 disabled:cursor-default bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 cursor-pointer",
        large ? "py-4 text-lg" : "py-4 px-3",
        className ? className : "",
      )}
    >
      {type === "submit" && pending ? "등록중" : text}
    </button>
  );
}
