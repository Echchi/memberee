import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Main from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("메인 페이지", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("알림 메세지 렌더링, 클릭 시 페이지 이동 및 숨김", async () => {
    render(<Main />);
    const alertMessage = screen.getByTestId("main-alert");
    expect(alertMessage).toBeInTheDocument();
    fireEvent.click(alertMessage);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/member");
    });

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(alertMessage).toHaveClass("hidden");
    });
  });

  test("수업 선택 시 수업 관리 페이지로 이동", async () => {
    render(<Main />);
    const memberManagement = screen.getByTestId("class-mainbox");
    fireEvent.click(memberManagement);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/class");
    });
  });
  test("직원 관리 선택 시 수업 관리 페이지로 이동", async () => {
    render(<Main />);
    const memberManagement = screen.getByTestId("worker-mainbox");
    fireEvent.click(memberManagement);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/worker");
    });
  });
  test("회원 관리 선택 시 수업 관리 페이지로 이동", async () => {
    render(<Main />);
    const memberManagement = screen.getByTestId("member-mainbox");
    fireEvent.click(memberManagement);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/member");
    });
  });
});
