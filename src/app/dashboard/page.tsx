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
    <main className="h-[calc(100vh-80px)] flex flex-col bg-white text-font-prim p-2 ">
      <div className="flex gap-2 mb-2">
        {shifts.map((shift) => (
          <button
            className={`px-4 py-2 font-normal rounded-md transition-colors ${
              selectedShiftId === shift.id
                ? "text-k3-blue"
                : "text-gray-400 hover:text-font-prim"
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
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-full">
            {selectedShift.machines.map((machine) => {
              const machineComments = comments.filter(
                (c) =>
                  c.machineId === machine.id &&
                  c.shiftId === selectedShiftId
              );
              return (
                <div
                  key={machine.id}
                  className="flex flex-col bg-gray-300 border border-gray-400 rounded-lg p-2 shadow-sm h-full"
                >
                  <div className="flex flex-row-reverse justify-between items-center mb-2 ml-1">
                    <span
                      onClick={() => {
                        setEditingComment(null);
                        setOpenModalFor(machine.id);
                      }}
                      className="text-k3-blue font-medium text-xl cursor-pointer"
                    >
                      +
                    </span>
                    <h3 className="text-sm font-semibold text-gray-600 flex-shrink-0">
                      {machine.name}
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1">
                    {machineComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col-reverse relative gap-1 bg-gray-50 p-2 rounded-md"
                      >
                        <p className="text-xs font-medium text-blue-700 text-right">
                          {comment.createBy}
                        </p>
                        <p className="text-sm text-gray-800 leading-tight">
                          {comment.description}
                        </p>
                        {comment.createBy === user && (
                          <div className="flex flex-row gap-1 absolute left-3 bottom-2 text-[.7rem]">
                            <FaPen
                              className="text-font-sec cursor-pointer hover:text-k3-blue"
                              onClick={() => {
                                setEditingComment(comment);
                                setOpenModalFor(machine.id);
                                console.log(comment);
                              }}
                            />
                            <FaTrashAlt
                              className="text-font-sec cursor-pointer hover:text-k3-red"
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
