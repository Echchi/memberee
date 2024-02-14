import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import Template from "./template";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Template Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
    });
    (usePathname as jest.Mock).mockReturnValue("/member");
  });

  test("renders navigation links", () => {
    render(
      <Template>
        <div>Children</div>
      </Template>,
    );
    const navLinks = screen.queryAllByRole("link");
    expect(navLinks).toHaveLength(10);
  });

  const linksData = [
    { url: "/member", text: "회원 관리" },
    { url: "/worker", text: "직원 관리" },
    { url: "/class", text: "수업 관리" },
    { url: "/account", text: "계정 관리" },
  ];
  linksData.forEach(({ url, text }) => {
    test(`"${text}" link has active button color when URL is "${url}"`, () => {
      (usePathname as jest.Mock).mockReturnValue(url);
      render(
        <Template>
          <div>Children</div>
        </Template>,
      );

      const links = screen.getAllByText(text);
      const hasActiveLink = links.some((link) =>
        link.className.includes("text-emerald-700"),
      );
      expect(hasActiveLink).toBeTruthy();
    });
  });

  test("calls 'back' function when back button is clicked", async () => {
    render(
      <Template>
        <div>Children</div>
      </Template>,
    );
    const backBtn = screen.queryByTestId("back-button");
    expect(backBtn).toBeInTheDocument();
    if (backBtn) {
      await userEvent.click(backBtn);
      expect(useRouter().back).toHaveBeenCalled();
    }
  });
});
