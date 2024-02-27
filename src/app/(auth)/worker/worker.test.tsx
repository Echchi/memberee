import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./page";
import { useRouter } from "next/navigation";
describe("직원관리 페이지", () => {
  test("직원관리 메인 페이지 렌더링", () => {
    render(<Main />);
    expect(screen.getByPlaceholderText(/직원 이름/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /등록/i })).toBeInTheDocument();
  });

  test("등록 버튼 클릭시 회원등록 모달 표출", () => {
    render(<Main />);
    const registerButton = screen.getByRole("button", { name: /등록/i });
    fireEvent.click(registerButton);

    const modalTitle = screen.getByText("직원 등록");
    expect(modalTitle).toBeInTheDocument();
  });
});
