import type { CommentType } from "@classes/APIManager/types/Models.types";
import { CommentCommands } from "./CommentCommands";
import { CommentHeader } from "./CommentHeader";
import { CommentMain } from "./CommentMain";
import { CommentRoot } from "./CommentRoot";
import React from "react";

type CommentProps = {
  isReply?: boolean;
  comment: CommentType;
};

export const Comment = ({ isReply, comment }: CommentProps) => {
  return (
    <CommentRoot isReply={isReply}>
      <CommentHeader
        displayName={comment.author!.displayName}
        user={comment.author!.user}
        createdAt={comment.createdAt}
        updatedAt={comment.updatedAt}
      />
      <CommentMain>{comment.content}</CommentMain>
      <CommentCommands likes={comment.likes} />
    </CommentRoot>
  );
};