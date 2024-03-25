import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import Detail from "./page";

import Modal from "@/component/modal";

describe("회원관리 상세 페이지", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("회원관리 상세 페이지 렌더링", () => {
    render(<Detail />);
    expect(screen.getByText(/이름/i)).toBeInTheDocument();
    expect(screen.getByText(/연락처/i)).toBeInTheDocument();
    expect(screen.getByText(/생년월일/i)).toBeInTheDocument();
    expect(screen.getByText(/담당/i)).toBeInTheDocument();
    expect(screen.getByText(/등록일/i)).toBeInTheDocument();
    expect(screen.getByText(/시작일/i)).toBeInTheDocument();
    expect(screen.getByText(/수업료/i)).toBeInTheDocument();
    expect(screen.getByText(/수업 시간/i)).toBeInTheDocument();
    expect(screen.getByText(/상담 일지/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /메모 추가/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /수정/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /목록/i })).toBeInTheDocument();
  });

  test("수정 버튼 클릭시 확인 및 취소 버튼 렌더링", () => {
    render(<Detail />);
    const editButton = screen.getByRole("button", { name: /수정/i });
    fireEvent.click(editButton);
    expect(screen.getByRole("button", { name: /확인/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /취소/i })).toBeInTheDocument();
  });
});
