import Login from "@/app/login/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("로그인 페이지", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("로그인 폼 렌더링", () => {
    render(<Login />); // ARRANGE
    expect(screen.getByPlaceholderText("아이디")).toBeInTheDocument(); // ASSERT
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument(); // ASSERT
    expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument(); // ASSERT
  });

  test("로그인 성공 시 메인 페이지 이동", async () => {
    render(<Login />);
    const idInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginBtn = screen.getByRole("button", { name: /로그인/i });

    await userEvent.type(idInput, "tennis");
    await userEvent.type(passwordInput, "12345");
    await userEvent.click(loginBtn);

    expect(mockPush).toHaveBeenCalledWith("/main");
  });
  test("로그인 실패시 유효성 검사", async () => {
    render(<Login />);
    const idInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginBtn = screen.getByRole("button", { name: /로그인/i });

    await userEvent.type(idInput, "wrong");
    await userEvent.type(passwordInput, "credentials");
    await userEvent.click(loginBtn);

    expect(
      await screen.findByText("아이디 또는 비밀번호를 확인해주세요"),
    ).toBeInTheDocument();
  });
});
