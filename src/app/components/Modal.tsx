"use client";

import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className=" absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Zavrieť modal"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
