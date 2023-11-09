import { CommentCommands } from "./CommentCommands";
import { CommentHeader } from "./CommentHeader";
import { CommentMain } from "./CommentMain";
import { CommentRoot } from "./CommentRoot";
import React from "react";

type CommentProps = {
  isReply?: boolean;
  content: string;
}

export function Comment({ isReply, content }: CommentProps) {
  return (
    <CommentRoot isReply={isReply}>
      <CommentHeader />
      <CommentMain>{content}</CommentMain>
      <CommentCommands />
    </CommentRoot>
  );
}