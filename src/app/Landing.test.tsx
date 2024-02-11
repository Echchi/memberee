import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "@/app/page";

describe("Landing Page", () => {
  test("renders a link to the login page", () => {
    render(<Landing />); // ARRANGE
    const linkElement = screen.getByRole("link", { name: /랜딩/i }); // ACT
    expect(linkElement).toBeInTheDocument(); // ASSERT
    expect(linkElement).toHaveAttribute("href", "/login");
  });
});
