import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Detail from "./page";

import Modal from "@/component/modal";
import { usePathname, useRouter } from "next/navigation";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("납부관리 상세 페이지", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("납부관리 상세 페이지 렌더링", () => {
    render(<Detail />);
    expect(screen.getByText(/이름/i)).toBeInTheDocument();
    expect(screen.getByText(/연락처/i)).toBeInTheDocument();
    expect(screen.getByText(/담당/i)).toBeInTheDocument();
    expect(screen.getByText(/납부내역/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /납부확인/i }),
    ).toBeInTheDocument();
  });

  test("회원 정보 선택 시 회원 상세로 이동", () => {
    render(<Detail />);
    const memberInfo = screen.getByTestId("member-info");
    fireEvent.click(memberInfo);
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("/member/"));
  });

  test("납부 버튼 클릭시 납부 확인 모달 표출", () => {
    render(<Detail />);
    const payButton = screen.getByRole("button", { name: /납부/i });
    fireEvent.click(payButton);

    const modalTitle = screen.getByText(/납부 확인/);
    expect(modalTitle).toBeInTheDocument();
  });
});
