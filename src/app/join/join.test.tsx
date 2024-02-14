import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Join from "@/app/join/page";
import { userEvent } from "@testing-library/user-event";

describe("회원가입 페이지", () => {
  test("회원가입 폼 렌더링", () => {
    render(<Join />); // ARRANGE
    expect(screen.getByPlaceholderText("아이디")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("휴대폰 번호")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("업체명")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("연락처")).toBeInTheDocument(); // ASSERT
    expect(
      screen.getByRole("button", { name: /회원가입/i }),
    ).toBeInTheDocument(); // ASSERT
  });

  test("회원가입 모든 항목 기입시 버튼 활성화", async () => {
    render(<Join />);
    const idInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const phonInput = screen.getByPlaceholderText("휴대폰 번호");
    const emailInput = screen.getByPlaceholderText("이메일");
    const coNameInput = screen.getByPlaceholderText("업체명");
    const coContactInput = screen.getByPlaceholderText("연락처");
    const joinBtn = screen.getByRole("button", { name: /회원가입/i });

    await userEvent.type(idInput, "test");
    await userEvent.type(passwordInput, "test");
    await userEvent.type(phonInput, "test");
    await userEvent.type(emailInput, "test");
    await userEvent.type(coNameInput, "test");
    await userEvent.type(coContactInput, "test");

    expect(joinBtn).toBeEnabled();
  });
});
