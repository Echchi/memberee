import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Hr, Preview, Tailwind } from "@react-email/components";

interface PlaidVerifyIdentityEmailProps {
  name: string;
  tmpPassword: string;
}

export const FindPasswordEmail = ({
  tmpPassword,
  name,
}: PlaidVerifyIdentityEmailProps) => {
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
        <Preview>{name} 님, memberee 임시 비밀번호가 발급되었습니다!</Preview>
        <Body className="font-sans text-center">
          <Container className="bg-gray-100 my-auto mx-auto p-5 rounded-lg text-center">
            <Container className="bg-white my-0 mx-auto p-10 rounded-lg text-center">
              <Link
                href={"https://www.memberee.com"}
                className="text-6xl font-black text-emerald-700 cursor-pointer"
              >
                memberee
              </Link>

              <Text className="font-medium text-xl mt-9 text-center">
                {name} 님, 임시비밀번호가 발급되었습니다!
              </Text>
              <Text className="text-base text-center">
                임시 비밀번호로 로그인 후, 반드시 비밀번호를 변경해주시기
                바랍니다
              </Text>
              <Section className="mx-auto my-10 text-center">
                <Text className="font-medium text-base text-center">
                  임시 비밀번호
                </Text>

                <Text className="text-4xl font-black bg-gray-100 py-4 rounded-lg select-text relative text-center">
                  {tmpPassword}
                </Text>

                <Link
                  href={"https://www.memberee.com/login"}
                  className="font-medium text-base cursor-pointer text-emerald-800 text-center"
                >
                  다시 로그인하러 가볼까요?
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

export default FindPasswordEmail;
