"use client";
import React, { useEffect, useState } from "react";
import { cls } from "../../libs/client/utils";
import { AnimatePresence, motion } from "framer-motion";

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
    if (e.target === e.currentTarget) {
      setIsMouseDownOnBackdrop(true);
    }
  };

  const handleBackgroundMouseUp = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isMouseDownOnBackdrop) {
      setTimeout(() => {
        setIsOpen(false);

        onClose();
      }, 200);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={handleBackgroundMouseDown}
          onMouseUp={handleBackgroundMouseUp}
          className="fixed inset-0 flex bg-black  bg-opacity-50 items-center justify-center z-20"
        >
          <div
            className={cls(
              "flex flex-col bg-white p-4 xl:p-6 w-full  max-h-[90vh] rounded-lg",
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

            <div className="grow relative mt-4 h-full">
              {content || children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
