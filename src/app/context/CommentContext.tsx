"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Comment = {
  id: string;
  machineId: string;
  machineName: string;
  shiftId: string;
  createBy: string;
  createAt: string;
  description: string;
  solved: boolean;
  shortDescription?: string;
};

type CommentContextType = {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  markCommentAsSolved: (id: string) => void;
  editComment: (id: string, description: string) => void;
};

const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

export const CommentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "test1",
      machineId: "61024",
      machineName: "BIW 1-1",
      shiftId: "morning",
      createBy: "Testovací užívateľ",
      createAt: "2024-06-01",
      description: "Toto je testovací komentár",
      solved: false,
    },
  ]);

  const addComment = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter((prev) => prev.id !== id));
  };

  const editComment = (id: string, description: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, description } : comment
      )
    );
  };

  const markCommentAsSolved = (id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, solved: true } : comment
      )
    );
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        markCommentAsSolved,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("CommentContext missing");
  }
  return context;
};
