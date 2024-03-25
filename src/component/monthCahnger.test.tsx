import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import monthChanger from "./monthChanger";
import { addMonths, format } from "date-fns";
import Main from "@/app/(tabBar)/salary/page";

describe("이전 달, 다음 달 이동 컴포넌트", () => {
  test("버튼 클릭시 날짜 변경", () => {
    render(<Main />);
    const prevMonthButton = screen.getAllByRole("button")[0];
    const nextMonthButton = screen.getAllByRole("button")[1];

    fireEvent.click(nextMonthButton);
    const nextMonth = format(
      addMonths(new Date(2024, 7, 26), 1),
      "yyyy년 MM월",
    );
    expect(screen.getByText(nextMonth)).toBeInTheDocument();

    fireEvent.click(prevMonthButton);
    const prevMonth = format(new Date(), "yyyy년 MM월");
    expect(screen.getByText(prevMonth)).toBeInTheDocument();
  });
});
