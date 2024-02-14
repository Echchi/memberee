import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabItem from "../tabItem";

describe("TabItem 컴포넌트", () => {
  const mockIcon = <svg data-testid="mock-icon"></svg>;
  const mockTitle = "Test Title";
  const mockUrl = "/test-url";

  test("TabItem 타이틀, 아이콘 렌더링", () => {
    render(
      <TabItem location="" url={mockUrl} icon={mockIcon} title={mockTitle} />,
    );

    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
    const iconElement = screen.getByTestId("mock-icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("url 일치시 TabItem 색상 변경", () => {
    render(
      <TabItem
        location={mockUrl}
        url={mockUrl}
        icon={mockIcon}
        title={mockTitle}
      />,
    );

    const containerDiv = screen.getByText(mockTitle).closest("div");
    expect(containerDiv).toHaveClass("text-emerald-700");
  });

  test("url 일치시 TabItem 색상 미변경", () => {
    render(
      <TabItem
        location="/another-url"
        url={mockUrl}
        icon={mockIcon}
        title={mockTitle}
      />,
    );

    const containerDiv = screen.getByText(mockTitle).closest("div");
    expect(containerDiv).not.toHaveClass("text-emerald-700");
    expect(containerDiv).toHaveClass(
      "hover:text-stone-500",
      "transition-colors",
      "text-stone-800",
    );
  });
});
