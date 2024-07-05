"use client";
import React, { useEffect, useState } from "react";
import { cls } from "@/libs/client/utils";

interface ModalProps {
  title: string;
  content?: React.ReactElement;
  children?: React.ReactElement;
  onClose: () => void;
  className?: string;
}

const Modal = ({
  title,
  content,
  onClose,
  className,
  children,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true); // 모달 상태 관리

  const [isMouseDownOnBackdrop, setIsMouseDownOnBackdrop] = useState(false); // 백드롭에서 mousedown 이벤트가 발생했는지 추적

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    console.log("handleBackgroundMouseDown");

    if (e.target === e.currentTarget) {
      setIsMouseDownOnBackdrop(true);
    }
  };

  const handleBackgroundMouseUp = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isMouseDownOnBackdrop) {
      setIsOpen(false);
      setTimeout(onClose, 200);
    }
    setIsMouseDownOnBackdrop(false);
  };

  const handleMouseUp = () => {
    setIsMouseDownOnBackdrop(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = (event: React.MouseEvent) => {
    // event.preventDefault();

    setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid={"modal-backdrop"}
      onMouseDown={handleBackgroundMouseDown}
      onMouseUp={handleBackgroundMouseUp}
      className={cls(
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20",
        isOpen ? " animate-fadeIn" : "animate-fadeOut",
      )}
    >
      <div
        className={cls(
          "bg-white p-4 xl:p-6 w-full min-h-fit relative rounded-lg",
          className ? className : "xl:w-2/5",
        )}
      >
        <button
          data-testid={"close-button"}
          onClick={(event: React.MouseEvent) => handleClose(event)}
          className="absolute top-4 right-4 text-2xl"
          type="button"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="mt-4">{content || children}</div>
      </div>
    </div>
  );
};

export default Modal;
