"use client";

import React from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  machineName?: string;
  machineId: string;
};

export default function Modal({
  open,
  onClose,
  children,
  machineName,
  machineId,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-surface/95  flex flex-col max-h-[80vh] overflow-hidden rounded-2xl max-w-md w-full border border-primary/20 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between bg-background/80 backdrop-blur-sm w-full rounded-t-2xl px-6 py-6 border-b border-primary/20">
          <div>
            <h1 className="font-semibold leading-relaxed text-onPrimary text-lg">
              {machineName}
            </h1>
            <span className="text-xs text-onSurface/60 leading-loose bg-surface/50 px-2 py-1 rounded-md">
              ID: {machineId}
            </span>
          </div>

          <button
            className="w-8 h-8 flex items-center justify-center text-sm bg-primary/20 hover:bg-primary/30 rounded-full border border-primary/30 cursor-pointer hover:scale-110 transition-all duration-200 group"
            onClick={onClose}
            aria-label="Zavřít okno"
          >
            <FiX className="text-onSurface transition" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-auto p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
