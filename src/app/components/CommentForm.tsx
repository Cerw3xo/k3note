"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCommentContext } from "../context/CommentContext";
import { useUserContext } from "../context/UserContext";
import type { Comment } from "../context/CommentContext";

type CommentProps = {
  machineName: string;
  machineId: string;
  shiftId: string;
  editingComment: Comment | null;
  onClose: () => void;
};

export default function CommentForm({
  machineName,
  machineId,
  shiftId,
  onClose,
  editingComment,
}: CommentProps & { editingComment: Comment | null }) {
  const [commentState, setCommentState] = useState({
    description: "",
    shortDescription: "",
    isProblem: false,
  });

  useEffect(() => {
    if (editingComment) {
      setCommentState({
        description: editingComment.description,
        shortDescription: editingComment.shortDescription || "",
        isProblem: !editingComment.solved,
      });
    } else {
      setCommentState({
        description: "",
        shortDescription: "",
        isProblem: false,
      });
    }
  }, [editingComment]);

  const [error, setError] = useState("");
  const { addComment, editComment } = useCommentContext();

  const { user } = useUserContext();

  const resetForm = () => {
    setCommentState({
      description: "",
      shortDescription: "",
      isProblem: false,
    });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentState.description) {
      setError("Vyplňte všechny povinná pole");
      return;
    }
    if (editingComment) {
      editComment(
        editingComment.id,
        commentState.description,
        commentState.shortDescription,
        !commentState.isProblem
      );
    } else {
      addComment({
        id: Date.now().toString(),
        machineId,
        machineName,
        shiftId,
        createBy: user,
        createAt: new Date().toISOString(),
        description: commentState.description,
        solved: !commentState.isProblem,
        shortDescription: commentState.shortDescription,
      });
    }

    setError("");
    resetForm();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-6 py-6 w-full space-y-4"
    >
      <label
        htmlFor="description"
        className="flex flex-col text-sm text-onSurface"
      >
        Záznam
        <textarea
          id="description"
          className="mt-2 w-full h-32 p-3 rounded-xl border-2 border-secondary/30 text-onSurface text-sm font-normal resize-none leading-relaxed focus:outline-none focus:ring focus:ring-primary/50  transition-all duration-200 bg-background/50"
          name="description"
          placeholder="Poznámka ke stroji"
          value={commentState.description}
          onChange={(e) => {
            setCommentState({
              ...commentState,
              description: e.target.value,
            });
            setError("");
          }}
        ></textarea>
      </label>

      {error && (
        <div className="text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}

      <label
        htmlFor="isProblem"
        className="flex flex-row items-center gap-3 text-sm mt-6 cursor-pointer hover:text-primary transition-colors duration-200"
      >
        <input
          id="isProblem"
          className="rounded-md w-4 h-4 focus:outline-none focus:ring focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-surface transition-all duration-200"
          name="isProblem"
          type="checkbox"
          checked={commentState.isProblem}
          onChange={(e) => {
            const nextIsProblem = e.target.checked;
            setCommentState((prev) => ({
              ...prev,
              isProblem: nextIsProblem,
              shortDescription: nextIsProblem
                ? prev.shortDescription
                : "",
            }));
          }}
        />
        Problém
      </label>

      <label htmlFor="shortDescription">
        <input
          id="shortDescription"
          className="w-full mt-2 p-3 text-onSurface rounded-xl border-2 border-secondary/30 text-sm focus:outline-none focus:ring focus:ring-primary/50 transition-all duration-200 bg-background/50 disabled:bg-gray-200/20 disabled:border-onSurface/20 disabled:cursor-not-allowed"
          name="shortDescription"
          type="text"
          placeholder="Stručný popis nevyřešeného problému"
          value={commentState.shortDescription}
          disabled={!commentState.isProblem}
          onChange={(e) =>
            setCommentState({
              ...commentState,
              shortDescription: e.target.value,
            })
          }
        />
      </label>

      <div className="w-full flex justify-end mt-8">
        <button
          type="submit"
          className="px-6 py-3 bg-primary/20 hover:bg-background/50 rounded-xl text-onPrimary/80 text-sm font-medium w-24 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-x hover:text-onSurface"
        >
          {editingComment ? "Uložit" : "Přidat"}
        </button>
      </div>
    </form>
  );
}
