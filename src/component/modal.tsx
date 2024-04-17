import React, { useState } from "react";
import { cls } from "@/libs/client/utils";

interface ModalProps {
  title: string;
  content: React.ReactElement;
  onClose: () => void;
  className?: string;
}

const Modal = ({ title, content, onClose, className }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true); // 모달 상태 관리
  const [animation, setAnimation] = useState("fadeIn"); // 애니메이션 상태 관리

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setAnimation("fadeOut");
      setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, 200);
    }
  };
  const handleClose = () => {
    setAnimation("fadeOut");
    setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid={"modal-backdrop"}
      onClick={(event) => handleBackdropClick(event)}
      className={cls(
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20",
        animation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut",
      )}
    >
      <div
        className={cls(
          "bg-white p-6 w-full min-h-fit relative rounded-lg",
          className ? className : "md:w-2/5",
        )}
      >
        <button
          data-testid={"close-button"}
          onClick={handleClose}
          className="absolute top-4 right-4 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-4">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
