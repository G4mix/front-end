import type { CommentType } from "@classes/APIManager/base/types/Models.types";
import { CommentCommands } from "./CommentCommands";
import { CommentHeader } from "./CommentHeader";
import { CommentMain } from "./CommentMain";
import { CommentRoot } from "./CommentRoot";
import React from "react";

type CommentProps = {
  handleWantToRespond: ({ comment, isReply }: { comment: CommentType, isReply?: boolean }) => void;
  isReply?: boolean;
  comment: CommentType;
  marked: boolean;
};

export const Comment = ({ isReply=false, comment, marked, handleWantToRespond }: CommentProps) => {
  return (
    <CommentRoot isReply={isReply} marked={marked}>
      <CommentHeader
        author={comment.author!}
        createdAt={comment.createdAt}
        updatedAt={comment.updatedAt}
      />
      <CommentMain>{comment.content}</CommentMain>
      <CommentCommands
        comment={comment}
        handleWantToRespond={() => handleWantToRespond({ comment, isReply })}
      />
    </CommentRoot>
  );
};