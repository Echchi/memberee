import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationTemplateProps {
  username: string;
  emailVerificationToken: string;
}

export const VerificationTemplate = ({
  username,
  emailVerificationToken,
}: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      Preview text that appears in the email client before opening the email.
    </Preview>
    <Body>
      <Container className="my-0 mx-auto">
        <h3 className="text-5xl xl:text-7xl font-extrabold text-emerald-700">
          memberee
        </h3>
        <h3 className="ml-3 text-black">누구나 편하게 쓰기 쉬운 회원관리</h3>

        <Section>
          <Button
            href={`${baseUrl}/auth/verify-email?token=${emailVerificationToken}`}
          >
            Click here to verify
          </Button>
        </Section>
        <Hr />
        <Text>Something in the footer.</Text>
      </Container>
    </Body>
  </Html>
);
