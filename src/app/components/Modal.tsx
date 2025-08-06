"use client";

import React from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  machineName?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  machineName,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-font-prim bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md p-6 relative max-w-md w-full h-[50%] border-[.05rem] border-k3-blue"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items center justify-between py-1">
          <h1 className="font-semibold">{machineName}</h1>
          <button
            className="w-5 h-5 flex items-center justify-center text-sm text-white bg-k3-blue rounded-full cursor-pointer hover:bg-accent-blue transition group"
            onClick={onClose}
            aria-label="Zavrieť modal"
          >
            <FiX className=" text-white group-hover:text-k3-blue transition" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
