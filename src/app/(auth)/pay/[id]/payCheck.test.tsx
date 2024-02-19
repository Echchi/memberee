import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Template from "@/app/(auth)/template";
import PayCheck from "@/app/(auth)/pay/[id]/payCheck";

describe("납부 확인 모달 컨텐츠", () => {
  test("링크 렌더링", () => {
    render(<PayCheck />);
    expect(screen.getByText(/납부일자/));
    expect(screen.getByText(/납부방법/));
    expect(screen.getByText(/납부금액/));
    expect(screen.getByRole("button", { name: /등록/ }));
  });
});
