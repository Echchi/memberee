import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "@/app/page";

describe("랜딩 페이지", () => {
  test("랜딩 클릭 시 로그인 페이지 이동", () => {
    render(<Landing />); // ARRANGE
    const linkElement = screen.getByRole("link", { name: /랜딩/i }); // ACT
    expect(linkElement).toBeInTheDocument(); // ASSERT
    expect(linkElement).toHaveAttribute("href", "/login");
  });
});
