import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../button";

describe("버튼 컴포넌트", () => {
  test("버튼 렌더링", () => {
    render(<Button text={"Button"} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toBeInTheDocument();
  });
  test("버튼 isDisabled tre", () => {
    render(<Button text={"Button"} isButtonDisabled={true} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass("bg-gray-300 cursor-default");
  });
  test("버튼 lage true", () => {
    render(<Button text={"Button"} large={true} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass("py-4 text-lg");
  });
  test("버튼 onClick", () => {
    const handleClick = jest.fn();
    render(<Button text={"Button"} onClick={handleClick} />);
    const buttonElement = screen.getByText("Button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});