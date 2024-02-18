import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "@/component/modal";

describe("모달 컴포넌트", () => {
  test("배경 선택 시 onClose 콜백 호출", () => {
    const handleClose = jest.fn();
    render(
      <Modal
        content="modal content"
        title="modal title"
        onClose={handleClose}
      />,
    );

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalled();
  });

  test("닫힘 버튼 선택 시 onClose 콜백 호출", () => {
    const handleClose = jest.fn();
    render(
      <Modal
        content="modal content"
        title="modal title"
        onClose={handleClose}
      />,
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
