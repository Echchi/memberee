import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./page";
import { userEvent } from "@testing-library/user-event";

describe("수업 관리 페이지", () => {
  test("수업 관리 페이지 렌더링", () => {
    render(<Main />);
    const selects = screen.getAllByTestId("select") as HTMLSelectElement[];
    const options = screen.getAllByTestId(
      "select-option",
    ) as HTMLOptionElement[];
    expect(screen.getByRole("button", { name: /출력/i })).toBeInTheDocument();
  });

  test("수정 버튼 클릭 시 취소, 확인 버튼 렌더링", async () => {
    render(<Main />);
    const editButton = screen.getByRole("button", { name: /수정/i });
    fireEvent.click(editButton);
  });
});
