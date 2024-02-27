import "@testing-library/jest-dom";
import {
  fireEvent,
  getAllByTestId,
  getByRole,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import Timepicker from "../timepicker";

describe("타임피커 컴포넌트", () => {
  test("타임피커 렌더링", () => {
    render(<Timepicker />);
    const select = screen.getByTestId("select") as HTMLSelectElement;
    const options = screen.getAllByTestId(
      "select-option",
    ) as HTMLOptionElement[];
    const input = screen.getByRole("textbox", {
      value: {
        min: 5,
        max: 5,
      },
    }) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(select, { target: { value: options[1].value } });
    expect(select.value).toBe(options[1].value);
  });

  test("두 자리 입력 시 : 자동 생성", () => {
    render(<Timepicker />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "09" } });
    expect(input).toHaveValue("09:");
  });

  test("유효하지 않은 시간 형식 입력 시 오류 표시 및 작성 값 삭제", () => {
    render(<Timepicker />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "3" } });
    expect(input).toHaveClass("ring-2 ring-rose-500");

    fireEvent.change(input, { target: { value: "09:7" } });
    expect(input).toHaveClass("ring-2 ring-rose-500");
  });
});
