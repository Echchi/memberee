import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentType } from "../../../../libs/constants";
import { checkExpiresAt } from "../../../../app/join/api";
import { createAccount } from "../../../../app/join/action";
import { checkCoNum, checkUserid } from "../../../../app/join/action";
import { JoinFormType } from "../../../../app/join/page";

export const useJoinForm = (token: string) => {
    const [email, setEmail] = useState("");
    const [errorPage, setErrorPage] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.DIFFERENT);
    const [payday, setPayday] = useState("");

    const formMethods = useForm({
        mode: "onBlur",
        defaultValues: {
            userid: "",
            password: "",
            co_name: "",
            co_num: "",
            payDay: "",
            paymentType: PaymentType.DIFFERENT,
        },
    });

    const { setError, clearErrors } = formMethods;

    const checkTokenExpires = useCallback(async (token: string) => {
        try {
            const result = await checkExpiresAt(token);
            if (result.email) {
                setErrorPage(false);
                setEmail(result.email);
            }
            setTokenLoading(false);
        } catch {
            setTokenLoading(false);
            setErrorPage(true);
        }
    }, []);

    useEffect(() => {
        setTokenLoading(true);
        if (token) {
            checkTokenExpires(token);
        }
    }, [token, checkTokenExpires]);

    const handleSubmit = useCallback(async (data: JoinFormType) => {
        data.payDay = paymentType === PaymentType.SAME ? payday : null;
        data.email = email;
        data.paymentType = paymentType;

        setIsLoading(true);
        try {
            await createAccount(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to create account", error);
            setIsLoading(false);
        }
    }, [paymentType, payday, email]);

    const handlePaymentTypeChange = useCallback(() => {
        setPaymentType((prevType) =>
            prevType === PaymentType.DIFFERENT ? PaymentType.SAME : PaymentType.DIFFERENT
        );
    }, []);

    const handlePaydayChange = useCallback((value: string) => {
        setPayday(value);
    }, []);

    const handleUseridBlur = useCallback(async (
        event: React.FocusEvent<HTMLInputElement>,
        fieldOnBlur: () => void,
    ) => {
        const userId = event.target.value.trim();
        if (userId.length === 0) {
            setError("userid", {
                type: "manual",
                message: "아이디를 입력해주세요",
            });
            return;
        }

        const isUseridUnique = await checkUserid(userId);
        if (!isUseridUnique) {
            setError("userid", {
                type: "manual",
                message: "이미 존재하는 아이디예요",
            });
        } else {
            clearErrors("userid");
        }
    }, [setError, clearErrors]);

    const handleCoNumBlur = useCallback(async (
        event: React.FocusEvent<HTMLInputElement>,
        fieldOnBlur: () => void,
    ) => {
        const coNum = event.target.value.trim();
        if (coNum.length === 0) {
            setError("co_num", {
                type: "manual",
                message: "사업자 등록번호를 입력해주세요",
            });
            return;
        }

        const isCoNumUnique = await checkCoNum(coNum);
        if (!isCoNumUnique) {
            setError("co_num", {
                type: "manual",
                message: "이미 가입된 사업장이에요",
            });
        } else {
            clearErrors("co_num");
        }
    }, [setError, clearErrors]);

    return {
        state: {
            email,
            errorPage,
            tokenLoading,
            isLoading,
            paymentType,
            payday,
        },
        handlers: {
            handleSubmit,
            handlePaymentTypeChange,
            handlePaydayChange,
            handleUseridBlur,
            handleCoNumBlur,
        },
        formMethods,
    };
}; 