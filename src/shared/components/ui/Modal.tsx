'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<IProps> = ({ children, isOpen, onClose, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleCloseModal);

    return () => {
      document.removeEventListener('keydown', handleCloseModal);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !isMounted) return null;

  const targetNode = document.getElementById('modal-root');

  if (!targetNode) return null;

  return createPortal(
    <section
      className={`fixed inset-s-0 inset-e-0 top-0 bottom-0 z-1000 h-screen bg-slate-dark/20 flex items-center justify-center`}
      onClick={onClose}
    >
      <div
        className={`sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:mx-auto overflow-y-auto scroll flex flex-col p-4 lg:p-8 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>,
    targetNode
  );
};

export default Modal;
