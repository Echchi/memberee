import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cls } from "@/libs/client/utils";

interface InputFieldProps {
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  label?: string | React.ReactElement;
  register?: UseFormRegisterReturn;
  required?: boolean;
  icon?: React.ReactElement;
  className?: string;
  errorMessage?: string[];
  maxLength?: number;
  options?: string[];
  isLong?: boolean;
  selectDescription?: string;
}

const Input: React.FC<
  InputFieldProps & InputHTMLAttributes<HTMLInputElement>
> = ({
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
  isLong = false,
  name = "",
  selectDescription,
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
        <span className="text-xs lg:text-lg text-stone-600 max-w-24 lg:max-w-full absolute inset-y-0 left-0 flex flex-nowrap items-center lg:pl-10 pl-4 whitespace-pre-line font-semibold">
          {label}
        </span>
      )}
      {type === "div" ? (
        <div
          className={cls(
            "inner_input_res",
            icon && isLong ? "lg:pl-20 pl-14 pr-2" : "",
            icon && !isLong ? "lg:px-20 px-14" : "",
            label && isLong ? "lg:pl-40 pl-20 pr-2" : "",
            label && !isLong ? "lg:px-40 px-20" : "",
            className ? `${className} !h-full` : "",
            className ? `${className} !h-full` : "",
          )}
        >
          {value}
        </div>
      ) : type === "select" ? (
        <>
          <select
            name={name}
            className={cls(
              "outline-none bg-white text-gray-400 font-medium text-xs lg:text-base",
              icon ? "ml-14 lg:ml-20" : "",
              label ? "ml-20 lg:ml-40" : "",
            )}
          >
            {options &&
              options.map((item, index) => <option key={index}>{item}</option>)}
          </select>
          {selectDescription && (
            <span className="ml-4 relative text-gray-400 font-medium text-xs lg:text-lg">
              {selectDescription}
            </span>
          )}
        </>
      ) : (
        <input
          className={cls(
            errorMessage ? "inner_input_error" : "inner_input",
            icon && isLong ? "lg:pl-20 pl-14 pr-2" : "",
            icon && !isLong ? "lg:px-20 px-14" : "",
            label && isLong ? "lg:pl-40 pl-20 pr-2" : "",
            label && !isLong ? "lg:px-40 px-20" : "",
            className ? `${className} !h-full` : "",
            className ? `${className} !h-full` : "",
          )}
          name={name}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          defaultValue={value}
        />
      )}
      {errorMessage && (
        <span className="error">{errorMessage[errorMessage.length - 1]}</span>
      )}
    </div>
  );
};

export default Input;
