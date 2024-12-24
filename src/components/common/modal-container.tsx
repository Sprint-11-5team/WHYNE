"use client";

import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

function Modal({ isOpen, onClose, children, className = "" }: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setAnimating(true);
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!showModal) return null;

  const getAnimationClass = () => {
    return animating
      ? "translate-y-0 transition-transform duration-300"
      : "translate-y-full transition-transform duration-300";
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 tablet:inset-y-0 flex items-end tablet:items-center tablet:justify-center">
        <div
          className={`
            relative z-20
            bg-white 
            w-full
            tablet:w-[52.8rem]
            max-h-[85vh] tablet:max-h-[98vh]
            rounded-t-[2rem] tablet:rounded-[2rem]
            overflow-y-auto
            ${getAnimationClass()}
            ${className}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
