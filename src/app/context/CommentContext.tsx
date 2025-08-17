"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

const LS_PREFIX = "k3note:comments:";

const pad2 = (n: number) => n.toString().padStart(2, "0");

export const formatDateYYYYMMDD = (date: Date): string => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

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
  dayKey?: string;
};

type CommentContextType = {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  markCommentAsSolved: (id: string) => void;
  editComment: (
    id: string,
    description: string,
    shortDescription: string,
    solved: boolean
  ) => void;
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
    {
      id: "test9",
      machineId: "61036",
      machineName: "BIW 1-1",
      shiftId: "morning",
      createBy: "Testovací užívateľ",
      createAt: "2024-06-01",
      description: "Toto je testovací komentár",
      solved: false,
    },
    {
      id: "Matej",
      machineId: "61027",
      machineName: "BIW 1-3",
      shiftId: "morning",
      createBy: "Testovací užívateľ",
      createAt: "2024-06-01",
      description:
        "Toto je testovací komentárToto je testovací komentárToto je testovací komentár",
      solved: false,
    },
    {
      id: "test2",
      machineId: "61027",
      machineName: "BIW 1-3",
      shiftId: "morning",
      createBy: "Matej",
      createAt: "2024-06-01",
      description:
        "Toto je testovací komentár Toto je testovací komentár Toto je testovací komentár",
      solved: false,
    },
    {
      id: "test8",
      machineId: "61028",
      machineName: "BIW 1-3",
      shiftId: "morning",
      createBy: "Karel",
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

  const editComment = (
    id: string,
    description: string,
    shortDescription: string,
    solved: boolean
  ) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              description,
              shortDescription,
              solved,
            }
          : comment
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
