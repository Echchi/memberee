import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Tag from "../tag";

describe("Tag Component", () => {
  test("renders tag with emerald color", () => {
    render(<Tag color="emerald" title="Emerald Tag" />);
    const tagElement = screen.getByText("Emerald Tag");
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass("text-emerald-600");
  });

  test("renders tag with orange color", () => {
    render(<Tag color="orange" title="Orange Tag" />);
    const tagElement = screen.getByText("Orange Tag");
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass("text-orange-600");
  });

  test("renders tag with stone color", () => {
    render(<Tag color="stone" title="Stone Tag" />);
    const tagElement = screen.getByText("Stone Tag");
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass("text-stone-600");
  });

  test("renders tag with yellow color", () => {
    render(<Tag color="yellow" title="Yellow Tag" />);
    const tagElement = screen.getByText("Yellow Tag");
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass("text-yellow-600");
  });

  test("applies background styles when noBg is false", () => {
    render(<Tag color="emerald" title="Emerald Tag" />);
    const tagElement = screen.getByText("Emerald Tag");
    expect(tagElement).toHaveClass("bg-emerald-500/20");
  });

  test("applies ring styles when noBg is true", () => {
    render(<Tag color="emerald" title="Emerald Tag" noBg={true} />);
    const tagElement = screen.getByText("Emerald Tag");
    expect(tagElement).toHaveClass("ring-emerald-200");
  });

  test("calls onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(<Tag color="emerald" title="Clickable Tag" onClick={onClickMock} />);
    const tagElement = screen.getByText("Clickable Tag");
    fireEvent.click(tagElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});
