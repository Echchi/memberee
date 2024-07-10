import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
  ForwardedRef,
  forwardRef,
} from "react";
import {
  Field,
  FieldErrors,
  FormState,
  UseFormRegisterReturn,
} from "react-hook-form";
import { cls } from "@/libs/client/utils";

interface IOption {
  value: number | string;
  label: string;
}

interface InputFieldProps {
  name?: string;
  type: string;
  value?: string | string[] | React.ReactElement;
  placeholder?: string;
  label?: string | React.ReactElement;
  register?: UseFormRegisterReturn;
  required?: boolean;
  icon?: React.ReactElement;
  className?: string;
  errorMessage?: string[] | string;
  maxLength?: number;
  options?: IOption[];
  isLong?: boolean;
  selectDescription?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelectChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Input = forwardRef<
  HTMLInputElement,
  InputFieldProps & InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      type,
      value = "",
      placeholder = "",
      label,
      register,
      required,
      icon,
      className,
      errorMessage = [],
      maxLength,
      options,
      isLong = false,
      name = "",
      selectDescription,
      onChange,
      onSelectChange,
      onBlur,

      ...rest
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState(value || "");

    useEffect(() => {
      console.log("value", value);
      if (value && type === "select") {
        setSelectedValue(value);
      }
    }, [value, type]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
      if (onSelectChange) {
        onSelectChange(event);
      }
    };

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
          <span className="text-sm xl:text-lg text-stone-600 min-w-fit max-w-24 xl:max-w-full absolute inset-y-0 left-0 flex flex-nowrap items-center xl:pl-10 pl-4 whitespace-pre-line font-semibold">
            {label}
          </span>
        )}
        {type === "div" ? (
          <div
            className={cls(
              "inner_input_res",
              icon && isLong ? "xl:pl-20 pl-14 pr-2" : "",
              icon && !isLong ? "xl:px-20 px-14" : "",
              label && isLong ? "xl:pl-40 pl-20 pr-2" : "",
              label && !isLong ? "xl:px-40 px-20" : "",
              className ? `${className} !h-full` : "",
            )}
          >
            {value || <div className="skeleton rounded-lg h-10 w-2/3" />}
            {selectDescription && (
              <span className="ml-4 relative font-medium text-sm xl:text-lg">
                {selectDescription}
              </span>
            )}
          </div>
        ) : type === "tel" ? (
          <a
            href={`tel:${typeof value === "string" && value.replaceAll("-", "")}`}
            className={cls(
              "inner_input_res",
              icon && isLong ? "xl:pl-20 pl-14 pr-2" : "",
              icon && !isLong ? "xl:px-20 px-14" : "",
              label && isLong ? "xl:pl-40 pl-20 pr-2" : "",
              label && !isLong ? "xl:px-40 px-20" : "",
              className ? `${className} !h-full` : "",
            )}
          >
            {value || <div className="skeleton rounded-lg h-10 w-2/3" />}
            {selectDescription && (
              <span className="ml-4 relative  font-medium text-sm xl:text-lg">
                {selectDescription}
              </span>
            )}
          </a>
        ) : type === "select" ? (
          <>
            <select
              name={name}
              className={cls(
                "outline-none bg-white text-stone-600 font-medium text-sm xl:text-lg",
                icon ? "ml-14 xl:ml-20" : "",
                label ? "ml-20 xl:ml-48" : "",
              )}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              {options &&
                options.map(({ value, label }, index) => (
                  <option key={index} value={value}>
                    {label}
                  </option>
                ))}
            </select>
            {selectDescription && (
              <span className="ml-4 relative font-medium text-sm xl:text-lg">
                {selectDescription}
              </span>
            )}
          </>
        ) : (
          <input
            className={cls(
              errorMessage[0] ? "inner_input_error" : "inner_input",
              icon && isLong ? "xl:pl-20 pl-14 pr-2" : "",
              icon && !isLong ? "xl:px-20 px-14" : "",
              label && isLong ? "xl:pl-48 pl-32 pr-2" : "",
              label && !isLong ? "xl:px-48 px-20" : "",
              className ? `${className} !h-full` : "",
              className ? `${className} !h-full` : "",
            )}
            name={name}
            type={type}
            maxLength={maxLength || 500}
            placeholder={placeholder}
            required={required || false}
            defaultValue={value || ""}
            onChange={onChange && ((event) => onChange(event))}
            onBlur={onBlur && ((event) => onBlur(event))}
            ref={ref}
            {...rest}
          />
        )}
        {errorMessage && errorMessage.length > 0 && (
          <span className="error">{errorMessage[0]}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
