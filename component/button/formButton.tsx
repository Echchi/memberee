"use client";
import { cls } from "../../libs/client/utils";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";

export interface ButtonProps {
  text: string;
  [key: string]: any;
  className?: string;
}

export default function FormButton({
  onClick,
  text,
  className,
  isButtonDisabled,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  useEffect(() => {
    console.log("pending", pending);
  }, [pending]);
  return (
    <button
      {...rest}
      onClick={onClick}
      type={"submit"}
      disabled={pending || isButtonDisabled}
      className={cls(
        "py-4 text-lg outline-none w-full rounded-lg text-white font-semibold transition-all px-3 disabled:bg-gray-300 disabled:cursor-default bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600",
        className ? className : "",
      )}
    >
      {pending ? "로딩중" : text}
    </button>
  );
}
