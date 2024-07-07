import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Hr, Preview, Tailwind } from "@react-email/components";

interface IVerifyEmail {
  token: string;
}

export const VerifyEmail = ({ token }: IVerifyEmail) => {
  return (
    <Html>
      <Head>
        <style>
          {`
            @media (max-width: 600px) {
              .text-6xl {
                font-size: 2.5rem;
              }
              .text-xl {
                font-size: 1rem;
              }
              .text-base {
                font-size: 0.5rem;
              }
              .text-4xl {
                font-size: 1.5rem;
              }`}
        </style>
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: ["var(--font-pretendard)"],
              },
            },
          },
        }}
      >
        <Preview>memberee 메일 인증</Preview>
        <Body className="font-sans text-center">
          <Container className="bg-gray-100 my-auto mx-auto p-5 rounded-lg text-center">
            <Container className="bg-white my-0 mx-auto p-10 rounded-lg text-center">
              <Link
                href={"https://www.memberee.com"}
                className="text-6xl font-black text-emerald-700 cursor-pointer"
              >
                memberee
              </Link>

              <Text className="font-bold text-xl mt-9 text-center">
                멤버리에 오신 것을 환영합니다!
              </Text>
              <Text className="text-base text-center font-medium">
                아래 버튼을 눌러 회원가입을 완료해 주세요
              </Text>
              <Section className="mx-auto my-10 text-center">
                <Link
                  className="px-32 py-4 text-white font-bold text-lg bg-emerald-700 border-0 rounded-lg cursor-pointer"
                  // href={`https://www.memberee.com/join?token=${token}`}
                  href={`http://localhost:3000/join?token=${token}`}
                >
                  인증하기
                </Link>
              </Section>
              <Hr />
              <Text className="text-emerald-700 font-bold">memberee</Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
