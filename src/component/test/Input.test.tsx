import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../input";

describe("Input Component", () => {
  test("renders input field", () => {
    render(<Input type={"text"} placeholder={"Enter text"} />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  test("displays icon if provided", () => {
    const icon = <span data-testid={"icon"}>Icon</span>;
    render(<Input type={"test"} icon={icon} />);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("displays label if provided", () => {
    render(<Input type={"test"} label={"Label"} />);
    const labelElement = screen.getByText("Label");
    expect(labelElement).toBeInTheDocument();
  });

  test("displays error message if provided", () => {
    render(<Input type={"test"} errorMessage={"Error Message"} />);
    const errorElement = screen.getByText("Error Message");
    expect(errorElement).toBeInTheDocument();
  });

  test("displays select options if provided", () => {
    const options = ["Option 1", "Option 2"];
    render(<Input type={"select"} options={options} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveDisplayValue(options[0]);
    expect(selectElement).toContainElement(screen.getByText("Option 1"));
    expect(selectElement).toContainElement(screen.getByText("Option 2"));
  });
});
