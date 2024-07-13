import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../modal/modal";

describe("모달 컴포넌트", () => {
  test("배경 선택 시 onClose 콜백 호출", async () => {
    const onClose = jest.fn();

    render(
      <Modal content={<div></div>} title="modal title" onClose={onClose} />,
    );

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    await waitFor(() => expect(onClose).toHaveBeenCalled(), { timeout: 1000 });
  });

  test("닫힘 버튼 선택 시 onClose 콜백 호출", async () => {
    const onClose = jest.fn();
    render(
      <Modal content={<div></div>} title="modal title" onClose={onClose} />,
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    await waitFor(() => expect(onClose).toHaveBeenCalled(), { timeout: 1000 });
  });
});
