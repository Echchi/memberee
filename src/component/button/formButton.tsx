import { cls } from "@/libs/client/utils";

export interface ButtonProps {
  text: string;
  [key: string]: any;
  className?: string;
}

export default function FormButton({
  onClick,
  text,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      type={"submit"}
      className={cls(
        "py-4 text-lg outline-none w-full rounded-lg text-white font-semibold transition-all px-3 disabled:bg-gray-300 disabled:cursor-default bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600",
        className ? className : "",
      )}
    >
      {text}
    </button>
  );
}
