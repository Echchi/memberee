import React, { useCallback, useMemo } from "react";
import Input from "../../../input";
import { Controller, useForm } from "react-hook-form";
import FormButton from "../../../button/formButton";
import { useRouter, useSearchParams } from "next/navigation";
import {
  checkCoNum,
  checkUserid,
  createAccount,
} from "../../../../app/join/action";
import {
  ID_REGEX,
  ID_REGEX_ERROR,
  ONLY_NUMBER_REGEX,
  ONLY_NUMBER_REGEX_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../../../../libs/regex";
import { checkExpiresAt } from "../../../../app/join/api";
import TokenError from "../../../../app/tokenError";
import { JoinFormType } from "../../../../app/join/page";
import { PaymentType } from "../../../../libs/constants";
import PaymentTypeCheckbox from "./paymentTypeCheckbox";
import { AnimatePresence, motion } from "framer-motion";
import PasswordStrength from "./passwordStrength";
import Loading from "../../../../app/loading";
import { useJoinForm } from "../hooks/useJoinForm";
import { UserIcon, LockIcon, BuildingIcon, CheckIcon } from "./icons";
import PaymentTypeSection from "./paymentTypeSection";

const JoinForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  const {
    state,
    handlers,
    formMethods,
  } = useJoinForm(token);

  const {
    isLoading,
    isSuccess,
    errorPage,
    tokenLoading,
    paymentType,
    payday,
  } = state;

  const {
    handleSubmit,
    handlePaymentTypeChange,
    handlePaydayChange,
    handleUseridBlur,
    handleCoNumBlur,
  } = handlers;

  const {
    register,
    formState: { errors },
    control,
    watch,
  } = formMethods;

  const userid = watch("userid");
  const co_num = watch("co_num");
  const password = watch("password");

  const renderAdminInfo = useMemo(() => (
    <>
      <p className="font-semibold tracking-wide text-stone-600 pt-5 pb-3 xl:text-lg">
        관리자 정보
      </p>
      <Controller
        rules={{
          required: "아이디를 입력해주세요",
          pattern: {
            value: ID_REGEX,
            message: ID_REGEX_ERROR,
          },
        }}
        render={({ field }) => (
          <Input
            isLoading={isLoading}
            icon={<UserIcon />}
            type="text"
            placeholder="아이디"
            maxLength={10}
            required
            className="h-16 border-b-1 rounded-t-lg"
            {...field}
            onBlur={(e) => handleUseridBlur(e, field.onBlur)}
            errorMessage={[errors.userid?.message ?? ""]}
          />
        )}
        name="userid"
        control={control}
      />
      <Input
        isLoading={isLoading}
        icon={<LockIcon />}
        type="password"
        placeholder="비밀번호"
        required
        className="h-16 border-t-0 border-b-1 rounded-b-lg"
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          pattern: {
            value: PASSWORD_REGEX,
            message: PASSWORD_REGEX_ERROR,
          },
        })}
        errorMessage={[errors.password?.message ?? ""]}
      />
      <div className="flex justify-end pt-3">
        <PasswordStrength password={password} />
      </div>
    </>
  ), [isLoading, errors, control, handleUseridBlur, password]);

  const renderCompanyInfo = useMemo(() => (
    <>
      <p className="font-semibold tracking-wide text-stone-600 pt-8 pb-3 xl:text-lg">
        업체 정보
      </p>
      <Input
        isLoading={isLoading}
        icon={<BuildingIcon />}
        type="text"
        placeholder="업체명"
        required
        className="h-16 border-t-1 border-b-1 rounded-t-lg"
        {...register("co_name", {
          required: "업체이름을 입력해주세요",
        })}
        errorMessage={[errors.co_name?.message ?? ""]}
      />
      <Controller
        rules={{
          required: "사업자등록번호를 입력해주세요",
          pattern: {
            value: ONLY_NUMBER_REGEX,
            message: ONLY_NUMBER_REGEX_ERROR,
          },
        }}
        render={({ field }) => (
          <Input
            isLoading={isLoading}
            icon={<CheckIcon />}
            type="text"
            placeholder="사업자 등록 번호를 숫자로만 입력해주세요"
            required
            className="h-16 border-t-0 rounded-b-lg"
            {...field}
            maxLength={10}
            onBlur={(e) => handleCoNumBlur(e, field.onBlur)}
            errorMessage={[errors.co_num?.message ?? ""]}
          />
        )}
        name="co_num"
        control={control}
      />
    </>
  ), [isLoading, errors, control, handleCoNumBlur]);

  if (tokenLoading) {
    return <Loading />;
  }

  if (errorPage) {
    return <TokenError />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="xl:pt-10 xl:max-w-full xl:w-[1400px] xl:mx-auto px-1 xl:px-32"
      data-testid="join-form"
    >
      <div className="flex flex-col justify-center items-center mt-8">
        <h3
          className="text-5xl font-extrabold ml-3 text-emerald-700 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          memberee
        </h3>
        <h3 className="text-black py-2">
          누구나 편하게 쓰기 쉬운 회원관리
        </h3>
      </div>
      <div className="px-3 mt-4 mb-8">
        {renderAdminInfo}
        {renderCompanyInfo}
        <PaymentTypeSection
          paymentType={paymentType}
          onPaymentTypeChange={handlePaymentTypeChange}
          payday={payday}
          onPaydayChange={handlePaydayChange}
          isLoading={isLoading}
        />
        <FormButton
          text={isLoading ? "가입중" : "회원가입"}
          className="mt-5"
          isButtonDisabled={Object.entries(errors).length > 0 || isLoading}
        />
      </div>
    </form>
  );
};

export default JoinForm;
