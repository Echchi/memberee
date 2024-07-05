import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accout from "@/app/join_v.1.0/page";
import { userEvent } from "@testing-library/user-event";

describe("계정 관리 페이지", () => {
  test("계정 관리 페이지 렌더링", () => {
    render(<Accout />); // ARRANGE
    expect(screen.getByPlaceholderText("아이디")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("휴대폰 번호")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("업체명")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("연락처")).toBeInTheDocument(); // ASSERT
    expect(screen.getByRole("button", { name: /수정/i })).toBeInTheDocument(); // ASSERT
    expect(screen.getByRole("button", { name: /탈퇴/i })).toBeInTheDocument(); // ASSERT
  });

  test("수정 버튼 클릭 시 취소, 확인 버튼 렌더링", async () => {
    render(<Accout />);
    const editButton = screen.getByRole("button", { name: /수정/i });
    fireEvent.click(editButton);
    expect(screen.getByRole("button", { name: /확인/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /취소/i })).toBeInTheDocument();
  });
});
