"use client";

import React from "react";
import { useState } from "react";

type CommentProps = {
  machineName: string;
  onSubmit: (data: {
    name: string;
    description: string;
    shortDescription?: string;
    solved: boolean;
  }) => void;
  onClose: () => void;
};

export default function CommentForm({
  machineName,
  onSubmit,
  onClose,
}: CommentProps) {
    const [commentState, setCommentState] = 
}
