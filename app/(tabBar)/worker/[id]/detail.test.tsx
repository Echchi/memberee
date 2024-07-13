import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Detail from "./page";
import Accout from "../../../join/page";
import React from "react";

describe("직원 상세 페이지", () => {
  test("직원 상세 페이지 렌더링", () => {
    render(<Detail />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("연락처")).toBeInTheDocument();
    expect(screen.getByText("생년월일")).toBeInTheDocument();
    expect(screen.getByText("요일 선택")).toBeInTheDocument();
    expect(screen.getByText("수수료")).toBeInTheDocument();
    expect(screen.getByText("시작 일자")).toBeInTheDocument();
    expect(screen.getByText("비고")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /수정/i }));
    expect(screen.getByRole("button", { name: /퇴사/i }));
  });

  test("수정 버튼 클릭 시 취소, 확인 버튼 렌더링", async () => {
    render(<Accout />);
    const editButton = screen.getByRole("button", { name: /수정/i });
    fireEvent.click(editButton);
    expect(screen.getByRole("button", { name: /확인/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /취소/i })).toBeInTheDocument();
  });
});
