import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../input";

describe("Input 컴포넌트", () => {
  test("Input 필드 활성화", () => {
    render(<Input type={"text"} placeholder={"Enter text"} />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  test("Input 아이콘 렌더링", () => {
    const icon = <span data-testid={"icon"}>Icon</span>;
    render(<Input type={"test"} icon={icon} />);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("Input 라벨 렌더링", () => {
    render(<Input type={"test"} label={"Label"} />);
    const labelElement = screen.getByText("Label");
    expect(labelElement).toBeInTheDocument();
  });

  test("Input 에러 메세지 렌더링", () => {
    render(<Input type={"test"} errorMessage={"Error Message"} />);
    const errorElement = screen.getByText("Error Message");
    expect(errorElement).toBeInTheDocument();
  });

  test("Input 셀렉트 렌더링", () => {
    const options = ["Option 1", "Option 2"];
    render(<Input type={"select"} options={options} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveDisplayValue(options[0]);
    expect(selectElement).toContainElement(screen.getByText("Option 1"));
    expect(selectElement).toContainElement(screen.getByText("Option 2"));
  });
});
