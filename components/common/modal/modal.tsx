"use client";
import React, { useEffect, useCallback, useState } from "react";
import { cls } from "../../../libs/client/utils";
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
  const [isVisible, setIsVisible] = useState(true);
  const [isMouseDownOnBackdrop, setIsMouseDownOnBackdrop] = React.useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // 애니메이션 시간과 동일하게 설정
  }, [onClose]);

  const handleBackgroundMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMouseDownOnBackdrop(true);
    }
  }, []);

  const handleBackgroundMouseUp = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isMouseDownOnBackdrop) {
      handleClose();
    }
    setIsMouseDownOnBackdrop(false);
  }, [isMouseDownOnBackdrop, handleClose]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDownOnBackdrop(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={handleBackgroundMouseDown}
          onMouseUp={handleBackgroundMouseUp}
          className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center z-20"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cls(
              "relative flex flex-col bg-white p-4 xl:p-6 w-full max-h-[90vh] rounded-lg",
              className ? className : "w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]",
            )}
          >
            <button
              data-testid={"close-button"}
              onClick={handleClose}
              className="absolute top-4 right-4 text-2xl"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold">{title}</h2>

            <div className="grow relative mt-4 h-full">
              {content || children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
