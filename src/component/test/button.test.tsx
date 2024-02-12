import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../button";

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button text={"Button"} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toBeInTheDocument();
  });
  test("disabled when isDisabled is true", () => {
    render(<Button text={"Button"} isButtonDisabled={true} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass("bg-gray-300 cursor-default");
  });
  test("large when lage is true", () => {
    render(<Button text={"Button"} large={true} />);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass("py-4 text-lg");
  });
  test("calls onClick props when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text={"Button"} onClick={handleClick} />);
    const buttonElement = screen.getByText("Button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
