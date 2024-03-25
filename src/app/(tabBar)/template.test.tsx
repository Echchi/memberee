import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import Template from "./template";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("템플릿 컴포넌트", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
    });
    (usePathname as jest.Mock).mockReturnValue("/member");
  });

  test("링크 렌더링", () => {
    render(
      <Template>
        <div>Children</div>
      </Template>,
    );
    const navLinks = screen.queryAllByRole("link");
    expect(navLinks).toHaveLength(12);
  });

  const linksData = [
    { url: "/pay", text: "납부 관리" },
    { url: "/member", text: "회원 관리" },
    { url: "/worker", text: "직원 관리" },
    { url: "/class", text: "수업 관리" },
    { url: "/salary", text: "임금 관리" },
    { url: "/account", text: "계정 관리" },
  ];
  linksData.forEach(({ url, text }) => {
    test(`"${text}" 와 "${url}" 가 일치할 경우 글씨 색 변경`, () => {
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

  test("뒤로가기 버튼 클릭 시 뒤로가기", async () => {
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
