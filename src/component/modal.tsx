import React from "react";

interface ModalProps {
  title: string;
  content: React.ReactElement;
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div className="bg-white p-6 w-full max-h-fit md:w-2/5  relative rounded-lg">
        <button
          data-testid={"close-button"}
          onClick={onClose}
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
