import { CommentCommands } from "./CommentCommands";
import { CommentHeader } from "./CommentHeader";
import { CommentMain } from "./CommentMain";
import { CommentRoot } from "./CommentRoot";
import React from "react";

type CommentProps = {
  isReply?: boolean;
  content: string;
  likes: number;
}

export function Comment({ isReply, content, likes }: CommentProps) {
  return (
    <CommentRoot isReply={isReply}>
      <CommentHeader />
      <CommentMain>{content}</CommentMain>
      <CommentCommands likes={likes} />
    </CommentRoot>
  );
}