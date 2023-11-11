import { CommentCommands } from "./CommentCommands";
import { CommentHeader } from "./CommentHeader";
import { CommentMain } from "./CommentMain";
import { CommentRoot } from "./CommentRoot";
import React from "react";

type CommentProps = {
  isReply?: boolean;
  content: string;
  like: number;
}

export function Comment({ isReply, content, like }: CommentProps) {
  return (
    <CommentRoot isReply={isReply}>
      <CommentHeader />
      <CommentMain>{content}</CommentMain>
      <CommentCommands like={like} />
    </CommentRoot>
  );
}