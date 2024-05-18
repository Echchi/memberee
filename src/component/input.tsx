import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cls } from "@/libs/client/utils";

interface IOption {
  value: number | string;
  label: string;
}
interface InputFieldProps {
  name?: string;
  type: string;
  value?: string | string[];
  placeholder?: string;
  label?: string | React.ReactElement;
  register?: UseFormRegisterReturn;
  required?: boolean;
  icon?: React.ReactElement;
  className?: string;
  errorMessage?: string[];
  maxLength?: number;
  options?: IOption[];
  isLong?: boolean;
  selectDescription?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelectChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Input: React.FC<
  InputFieldProps & InputHTMLAttributes<HTMLInputElement>
> = ({
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
}) => {
  // const [selectedValue, setSelectedValue] = useState(value || "");
  //
  // useEffect(() => {
  //   if (value && type === "select") {
  //     setSelectedValue(value);
  //   }
  // }, [value]);
  //
  // const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedValue(event.target.value);
  //   if (onSelectChange) {
  //     onSelectChange(event);
  //   }
  // };

  return (
    <></>
    // <div
    //   className={cls(
    //     "relative flex items-center w-full border border-stone-300 bg-white",
    //     className ? className : "",
    //   )}
    // >
    //   {icon && (
    //     <span className="absolute inset-y-0 left-0 flex items-center pl-4">
    //       {icon}
    //     </span>
    //   )}
    //   {label && (
    //     <span className="text-xs lg:text-lg text-stone-600 max-w-24 lg:max-w-full absolute inset-y-0 left-0 flex flex-nowrap items-center lg:pl-10 pl-4 whitespace-pre-line font-semibold">
    //       {label}
    //     </span>
    //   )}
    //   {type === "div" ? (
    //     <div
    //       className={cls(
    //         "inner_input_res",
    //         icon && isLong ? "lg:pl-20 pl-14 pr-2" : "",
    //         icon && !isLong ? "lg:px-20 px-14" : "",
    //         label && isLong ? "lg:pl-40 pl-20 pr-2" : "",
    //         label && !isLong ? "lg:px-40 px-20" : "",
    //         className ? `${className} !h-full` : "",
    //       )}
    //     >
    //       {value || ""}
    //       {selectDescription && (
    //         <span className="ml-4 relative  font-medium text-xs lg:text-lg">
    //           {selectDescription}
    //         </span>
    //       )}
    //     </div>
    //   ) : type === "select" ? (
    //     <>
    //       <select
    //         name={name}
    //         className={cls(
    //           "outline-none bg-white text-stone-600 font-medium text-xs lg:text-lg",
    //           icon ? "ml-14 lg:ml-20" : "",
    //           label ? "ml-20 lg:ml-48" : "",
    //         )}
    //         value={selectedValue}
    //         onChange={handleSelectChange}
    //       >
    //         {options &&
    //           options.map(({ value, label }, index) => (
    //             <option key={index} value={value}>
    //               {label}
    //             </option>
    //           ))}
    //       </select>
    //       {selectDescription && (
    //         <span className="ml-4 relative font-medium text-xs lg:text-lg">
    //           {selectDescription}
    //         </span>
    //       )}
    //     </>
    //   ) : (
    //     <input
    //       className={cls(
    //         errorMessage ? "inner_input_error" : "inner_input",
    //         icon && isLong ? "lg:pl-20 pl-14 pr-2" : "",
    //         icon && !isLong ? "lg:px-20 px-14" : "",
    //         label && isLong ? "lg:pl-48 pl-20 pr-2" : "",
    //         label && !isLong ? "lg:px-48 px-20" : "",
    //         className ? `${className} !h-full` : "",
    //         className ? `${className} !h-full` : "",
    //       )}
    //       name={name}
    //       type={type}
    //       maxLength={maxLength || 500}
    //       placeholder={placeholder}
    //       required={required || false}
    //       defaultValue={value || ""}
    //       onChange={onChange && ((event) => onChange(event))}
    //       onBlur={onBlur && ((event) => onBlur(event))}
    //     />
    //   )}
    //   {errorMessage && errorMessage.length > 0 && (
    //     <span className="error">{errorMessage[0]}</span>
    //   )}
    // </div>
  );
};

export default Input;
