import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "./page";

describe("직원등록 모달", () => {
  test("직원등록 모달 렌더링", () => {
    render(<Register />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("연락처")).toBeInTheDocument();
    expect(screen.getByText("생년월일")).toBeInTheDocument();
    expect(screen.getByText("요일 선택")).toBeInTheDocument();
    expect(screen.getByText("수수료")).toBeInTheDocument();
    expect(screen.getByText("시작 일자")).toBeInTheDocument();
    expect(screen.getByText("비고")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /등록/i }));
  });
});
