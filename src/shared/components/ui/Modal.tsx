'use client';
import React, { useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<IProps> = ({ children, isOpen, onClose, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <section
      className="fixed inset-s-0 inset-e-0 top-0 bottom-0 z-1000 h-screen bg-slate-dark/20 p-4 lg:p-8 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:mx-auto overflow-y-auto max-h-[80vh] scroll ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
