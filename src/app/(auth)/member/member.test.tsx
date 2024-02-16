import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("회원관리 조회 페이지", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("회원관리 메인 페이지 렌더링", () => {
    render(<Main />);
    expect(
      screen.getByPlaceholderText(/회원 이름, 연락처, 담당/i),
    ).toBeInTheDocument();
    const buttons = screen.getAllByRole("button", { name: /출력/i });
    expect(buttons).toHaveLength(2);
  });
});
