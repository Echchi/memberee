import React from "react";
import { cls } from "../../../libs/client/utils";
import { PaymentType } from "../../../libs/constants";

const PaymentTypeCheckbox = ({
  paymentType,
  onChange,
  value,
  title,
}: {
  paymentType: PaymentType;
  onChange: () => void;
  value: PaymentType;
  title: string;
}) => {
  return (
    <p
      className={cls(
        "flex items-center space-x-2 font-semibold transition-all",
        paymentType === value
          ? "*:text-emerald-600 text-sm xl:text-lg"
          : "*:text-gray-500 text-xs xl:text-base",
      )}
    >
      <input
        type="checkbox"
        className="accent-emerald-600 size-4 cursor-pointer"
        value={value}
        checked={paymentType === value}
        onChange={() => onChange()}
      />
      <span>{title}</span>
    </p>
  );
};

export default PaymentTypeCheckbox;
