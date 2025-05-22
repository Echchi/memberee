import React, { useCallback, useState } from "react";
import Input from "../../../../components/common/inputs/input";
import Button from "../../../../components/common/button/button";
import validator from "validator";
import {
  checkEmail,
  checkTmpEmail,
  createTmpEmail,
  sendVerifyEmail,
  updateTmpEmail,
} from "../api";

interface JoinProps {
  onClose: () => void;
  findId?: () => void;
}

interface EmailError {
  message: string;
  type: 'email' | 'result';
}

const Join: React.FC<JoinProps> = ({ onClose, findId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<EmailError | null>(null);

  const validateEmail = useCallback((email: string): string | null => {
    if (!email) return "이메일을 입력해주세요";
    if (!validator.isEmail(email)) return "이메일을 올바르게 입력해주세요";
    return null;
  }, []);

  const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);

    const errorMessage = validateEmail(value);
    if (errorMessage) {
      setError({ message: errorMessage, type: 'email' });
    } else {
      setError(null);
    }
  }, [validateEmail]);

  const handleEmailVerification = useCallback(async () => {
    try {
      setIsLoading(true);

      const isExist = await checkEmail(email);
      if (isExist) {
        setError({ message: "이미 가입되어 있는 이메일이에요", type: 'result' });
        return;
      }

      let tmpEmail = await checkTmpEmail(email);
      const expiresAt = new Date(Date.now() + 3600000);

      if (tmpEmail && new Date() > tmpEmail.expiresAt) {
        tmpEmail = await updateTmpEmail({
          id: tmpEmail.id,
          email,
          expiresAt,
        });
      } else if (!tmpEmail) {
        tmpEmail = await createTmpEmail({
          email,
          expiresAt,
        });
      }

      const result = await sendVerifyEmail({
        email: tmpEmail.email,
        token: tmpEmail.token,
      });

      if (result.success) {
        setIsSuccess(true);
        setError(null);
      } else {
        setError({ message: "잠시 뒤에 다시 시도해주세요!", type: 'result' });
      }
    } catch (error) {
      setError({ message: "오류가 발생했습니다. 다시 시도해주세요.", type: 'result' });
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const handleClickFindId = useCallback(() => {
    onClose();
    findId?.();
  }, [onClose, findId]);

  if (isSuccess) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center bg-white z-20 px-10 pb-10">
        <p className="text-lg font-medium">
          아래의 이메일로 인증 메일을 보냈어요!
        </p>
        <p className="mb-7 whitespace-pre">
          스펨 메일함에 있을 수도 있어요. 스펨 메일함도 확인해주세요.
        </p>
        <div className="bg-gray-100 rounded-lg w-full py-6 text-lg font-semibold text-center">
          {email}
        </div>
      </div>
    );
  }

  return (
    <div className="xl:px-8 xl:pb-5">
      <p className="text-lg font-medium text-center xl:pt-3">
        인증 메일을 받을 이메일을 입력해주세요
      </p>
      <p className="text-sm font-medium text-center pb-3 xl:pb-5">
        비밀번호 찾기나 중요 정보를 전달할 때 쓰기 때문에 확인이 필요해요
      </p>
      <Input
        isLoading={isLoading}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-300"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>
        }
        type="text"
        placeholder="이메일"
        required
        className="h-16 rounded-lg"
        onChange={handleChangeEmail}
        errorMessage={error?.type === 'email' ? [error.message] : undefined}
      />
      {error?.type === 'result' && (
        <p className="w-full flex justify-between text-orange-500 pt-3 font-semibold">
          <span>{error.message}</span>
          <span
            className="text-emerald-700 cursor-pointer"
            onClick={handleClickFindId}
          >
            아이디를 찾아볼까요?
          </span>
        </p>
      )}
      <Button
        text={isLoading ? "보내는 중" : "인증 메일 보내기"}
        className="mt-4"
        large
        isButtonDisabled={!!error || !email || isSuccess || isLoading}
        onClick={handleEmailVerification}
      />
    </div>
  );
};

export default Join;
