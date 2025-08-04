"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  CommentProvider,
  useCommentContext,
} from "../context/CommentContext";
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
    name: "",
    description: "",
    shortDescription: "",
    solved: true,
  });

  useEffect(() => {
    if (editingComment) {
      setCommentState({
        name: editingComment.createBy,
        description: editingComment.description,
        shortDescription: editingComment.shortDescription || "",
        solved: editingComment.solved,
      });
    } else {
      setCommentState({
        name: "",
        description: "",
        shortDescription: "",
        solved: true,
      });
    }
  }, [editingComment]);

  const [error, setError] = useState("");
  const { addComment, editComment } = useCommentContext();

  const { user } = useUserContext();

  const resetForm = () => {
    setCommentState({
      name: "",
      description: "",
      shortDescription: "",
      solved: true,
    });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentState.description) {
      setError("Vyplň všetky povinné polia");
      return;
    }
    if (editingComment) {
      editComment(editingComment.id, commentState.description);
    } else {
      addComment({
        id: Date.now().toString(),
        machineId,
        machineName,
        shiftId,
        createBy: user,
        createAt: new Date().toISOString(),
        description: commentState.description,
        solved: commentState.solved,
        shortDescription: commentState.shortDescription,
      });
    }

    setError("");
    resetForm();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="popis"
        value={commentState.description}
        onChange={(e) => {
          setCommentState({
            ...commentState,
            description: e.target.value,
          });
          setError("");
        }}
      ></textarea>
      {error && <div className="text-k3-red text-sm">{error}</div>}
      <label>
        <input
          type="checkbox"
          checked={!commentState.solved}
          onChange={(e) =>
            setCommentState({
              ...commentState,
              solved: !e.target.checked,
            })
          }
        />
      </label>

      {!commentState.solved && (
        <input
          type="text"
          placeholder="Stručný popis problému"
          value={commentState.shortDescription}
          onChange={(e) =>
            setCommentState({
              ...commentState,
              shortDescription: e.target.value,
            })
          }
        />
      )}
      <button type="submit">odoslat</button>
    </form>
  );
}
