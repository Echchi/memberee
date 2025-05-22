import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PaymentType } from "../../../../libs/constants";
import PaymentTypeCheckbox from "./paymentTypeCheckbox";
import Input from "../../../input";

interface PaymentTypeSectionProps {
    paymentType: PaymentType;
    onPaymentTypeChange: () => void;
    payday: string;
    onPaydayChange: (value: string) => void;
    isLoading: boolean;
}

const PaymentTypeSection: React.FC<PaymentTypeSectionProps> = ({
    paymentType,
    onPaymentTypeChange,
    payday,
    onPaydayChange,
    isLoading,
}) => {
    return (
        <>
            <div className="h-20 xl:h-28 flex justify-center items-center space-x-20">
                <PaymentTypeCheckbox
                    paymentType={paymentType}
                    onChange={onPaymentTypeChange}
                    value={PaymentType.DIFFERENT}
                    title="회원마다 납부일이 달라요"
                />
                <PaymentTypeCheckbox
                    paymentType={paymentType}
                    onChange={onPaymentTypeChange}
                    value={PaymentType.SAME}
                    title="모든 회원의 납부일이 같아요"
                />
            </div>
            <AnimatePresence>
                {paymentType === PaymentType.SAME ? (
                    <motion.div
                        key="payment_type"
                        initial={{ y: -3, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -3, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                        <Input
                            isLoading={isLoading}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-gray-300"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                            onSelectChange={(e) => onPaydayChange(e.target.value || "")}
                            value={payday}
                            required
                            className="h-16 rounded-lg"
                            type="select"
                            selectDescription="일이 납부일이에요"
                            options={Array.from({ length: 31 }, (_, index) => ({
                                value: index + 1,
                                label: (index + 1).toString(),
                            }))}
                        />
                    </motion.div>
                ) : (
                    <motion.div />
                )}
            </AnimatePresence>
        </>
    );
};

export default PaymentTypeSection; 