import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { userEvent } from "@testing-library/user-event";
import Modal from "../../../../component/modal/modal";
import Register from "./page";

describe("회원등록 모달", () => {
  test("회원등록 모달 렌더링", () => {
    render(<Register />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("연락처")).toBeInTheDocument();
    expect(screen.getByText("생년월일")).toBeInTheDocument();
    expect(screen.getByText("직업")).toBeInTheDocument();
    expect(screen.getByText("시간 선택")).toBeInTheDocument();
    expect(screen.getByText("납부금액")).toBeInTheDocument();
    expect(screen.getByText("시작 일자")).toBeInTheDocument();
    expect(screen.getByText("담당")).toBeInTheDocument();
    expect(screen.getByText("비고")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /등록/i }));
  });
});
