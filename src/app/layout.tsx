import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "@next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.ttf",
      weight: "800",
    },
  ],
  variable: "--font-pretendard",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "memberee",
  description:
    "A user-friendly membership management website accessible to everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>{children}</body>
    </html>
  );
}
