import React from "react";

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const Modal = ({ title, content, onClose }: ModalProps) => {
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      data-testid={"modal-backdrop"}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg relative">
        <button
          data-testid={"close-button"}
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;
