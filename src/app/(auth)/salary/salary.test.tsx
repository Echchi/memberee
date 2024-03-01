import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Main from "./page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("임금관리 페이지", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("임금관리 메인 페이지 렌더링", () => {
    render(<Main />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("회원 수")).toBeInTheDocument();
    expect(screen.getByText("회원 수업료")).toBeInTheDocument();
    expect(screen.getByText("부담금")).toBeInTheDocument();
    expect(screen.getByText("예상 임금")).toBeInTheDocument();
    expect(screen.getByText("합계")).toBeInTheDocument();
    expect(screen.getByText("예상 수익")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /출력/i }));
  });
});
