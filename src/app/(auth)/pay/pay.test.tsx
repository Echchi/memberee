import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./page";
import { useRouter } from "next/navigation";
import { addMonths, format } from "date-fns";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("납부관리 페이지", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("납부관리 메인 페이지 렌더링", () => {
    render(<Main />);
    expect(
      screen.getByPlaceholderText(/회원 이름, 연락처, 담당/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /출력/i })).toBeInTheDocument();
  });

  test("버튼 클릭시 날짜 변경", () => {
    render(<Main />);
    const prevMonthButton = screen.getAllByRole("button")[0];
    const nextMonthButton = screen.getAllByRole("button")[1];

    fireEvent.click(nextMonthButton);
    const nextMonth = format(addMonths(new Date(), 1), "yyyy년 MM월");
    expect(screen.getByText(nextMonth)).toBeInTheDocument();

    fireEvent.click(prevMonthButton);
    const prevMonth = format(new Date(), "yyyy년 MM월");
    expect(screen.getByText(prevMonth)).toBeInTheDocument();
  });
});
