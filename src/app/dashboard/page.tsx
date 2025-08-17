"use client";

import { useEffect, useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import Modal from "../components/Modal";
import CommentForm from "../components/CommentForm";
import { useCommentContext } from "../context/CommentContext";
import { useUserContext } from "../context/UserContext";
import type { Comment } from "../context/CommentContext";

type Machines = {
  id: string;
  name: string;
};

type Shift = {
  id: string;
  name: string;
  machines: Machines[];
};

export default function DashboardPage() {
  const { comments, deleteComment, editComment } =
    useCommentContext();
  const { user, setUser } = useUserContext();
  const [selectedShiftId, setSelectedShiftId] = useState("morning");

  const [editingComment, setEditingComment] =
    useState<Comment | null>(null);

  const machines: Machines[] = [
    { id: "61024", name: "BIW 1-1" },
    { id: "61029", name: "BIW 1-2" },
    { id: "61030", name: "BIW 1-3" },
    { id: "61033", name: "BIW 1-4" },
    { id: "61035", name: "BIW 1-5" },
    { id: "61036", name: "BIW 1-6" },
    { id: "61025", name: "BIW 2" },
    { id: "61027", name: "K3-H 2" },
    { id: "61028", name: "K3-H 3" },
    { id: "61034", name: "K3-H 4" },
    { id: "61031", name: "SEE 1" },
    { id: "61032", name: "SEE 2" },
  ];

  const shifts: Shift[] = [
    { id: "morning", name: "R", machines },
    { id: "afternoon", name: "O", machines },
    { id: "night", name: "N", machines },
  ];

  const [openModalFor, setOpenModalFor] = useState<string | null>(
    null
  );

  const handleClose = () => setOpenModalFor(null);

  const selectedShift =
    shifts.find((s) => s.id === selectedShiftId) || null;

  return (
    <main className="h-[calc(100vh-90px)] flex flex-col rounded-md bg-background px-1">
      <div className="flex gap-2 my-2 bg-surface/80 backdrop-blur-sm w-max p-2 rounded-xl shadow-lg border border-primary/10">
        {shifts.map((shift) => (
          <button
            className={`px-6 py-1 font-medium transition-all duration-200 first:ml-2 hover:scale-105 ${
              selectedShiftId === shift.id
                ? "text-onPrimary bg-primary/20 rounded-lg"
                : "text-onPrimary/70 hover:text-onSurface hover:bg-background/50 rounded-lg"
            }`}
            key={shift.id}
            onClick={() => setSelectedShiftId(shift.id)}
          >
            {shift.name}
          </button>
        ))}
      </div>

      <section className="flex-1 min-h-0">
        {selectedShift && (
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-3 h-full">
            {selectedShift.machines.map((machine) => {
              const machineComments = comments.filter(
                (c) =>
                  c.machineId === machine.id &&
                  c.shiftId === selectedShiftId
              );
              return (
                <div
                  key={machine.id}
                  className="flex flex-col bg-surface/90 shadow-lg hover:shadow-2xl rounded-xl p-3 h-full duration-300 border border-primary/10 hover:border-primary/30"
                >
                  <div className="flex flex-row-reverse justify-between items-center mb-3 ml-1 border-b border-onPrimary/10 py-3">
                    <span
                      onClick={() => {
                        setEditingComment(null);
                        setOpenModalFor(machine.id);
                      }}
                      className="w-6 h-6 flex items-center justify-center text-onSurface text-sm cursor-pointer bg-primary/20 hover:bg-primary/30 rounded-full hover:scale-110 transition-all duration-200 border border-primary/30"
                    >
                      +
                    </span>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold flex-shrink-0 text-onPrimary">
                        {machine.name}
                      </h3>
                      <p className="text-sm text-onSurface/70 bg-background/30 px-2 py-1 rounded-md">
                        {machine.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2">
                    {machineComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col-reverse relative gap-2 bg-background/30 p-3 rounded-lg border border-secondary/10 hover:border-primary/30 hover:bg-background/50 transition-all duration-200"
                      >
                        <p className="text-xs font-medium text-right">
                          {comment.createBy}
                        </p>
                        <p className="text-sm leading-relaxed">
                          {comment.description}
                        </p>
                        {comment.createBy === user && (
                          <div className="flex flex-row gap-2 absolute left-3 bottom-2 text-[.7rem]">
                            <FaPen
                              className="text-onSurface/70 cursor-pointer hover:text-primary hover:scale-110 transition-all duration-200"
                              onClick={() => {
                                setEditingComment(comment);
                                setOpenModalFor(machine.id);
                              }}
                            />
                            <FaTrashAlt
                              className="text-onSurface/70 cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-200"
                              onClick={() =>
                                deleteComment(comment.id)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Modal
                    open={openModalFor === machine.id}
                    onClose={handleClose}
                    machineName={machine.name}
                    machineId={machine.id}
                  >
                    {openModalFor === machine.id && (
                      <CommentForm
                        machineName={machine.name}
                        machineId={machine.id}
                        shiftId={selectedShiftId}
                        onClose={() => {
                          handleClose();
                          setEditingComment(null);
                        }}
                        editingComment={
                          openModalFor === machine.id
                            ? editingComment
                            : null
                        }
                      />
                    )}
                  </Modal>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
