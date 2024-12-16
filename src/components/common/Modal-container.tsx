'use client';

import { useEffect, useRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customDimStyle?: string;
};


function Modal({ isOpen, onClose, children, customDimStyle = "" }: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

 
  useEffect(() => {
    const handleClickOutside: EventListener = (e) => {
      if (!isOpen) return;

      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50">

      <div className={`absolute h-full w-full bg-black/30 ${customDimStyle}`} />

      <div
        ref={modalContentRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;