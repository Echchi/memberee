import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cls } from "@/libs/client/utils";

interface InputFieldProps {
  type: string;
  value?: string;
  placeholder?: string;
  label?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  icon?: React.ReactElement;
  className?: string;
  errorMessage?: string;
  maxLength?: number;
  options?: string[];
}

const Input: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  label,
  register,
  required,
  icon,
  className,
  errorMessage,
  maxLength,
  options,
  ...rest
}) => {
  return (
    <div
      className={cls(
        "relative flex items-center w-full border border-stone-300 bg-white",
        className ? className : "",
      )}
    >
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          {icon}
        </span>
      )}
      {label && (
        <span className="text-stone-600 max-w-24 lg:max-w-full absolute inset-y-0 left-0 flex items-center lg:pl-10 pl-4 whitespace-pre-line font-semibold">
          {label}
        </span>
      )}
      {type === "div" ? (
        <div
          className={cls(
            "inner_input_res",
            icon ? "pl-14" : "",
            label ? "ml-32 lg:ml-56" : "",
            className ? className : "",
          )}
        >
          {value}
        </div>
      ) : type === "select" ? (
        <select
          {...register}
          className={cls(
            "outline-none bg-white",
            icon ? "ml-14" : "",
            label ? "ml-32 lg:ml-56" : "",
          )}
        >
          {options &&
            options.map((item, index) => <option key={index}>{item}</option>)}
        </select>
      ) : (
        <input
          className={cls(
            errorMessage ? "inner_input_error" : "inner_input",
            icon ? "lg:px-20 px-14" : "",
            label ? "lg:px-56 px-32" : "",
            className ? `${className} !h-full` : "",
          )}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          {...register}
        />
      )}
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default Input;
