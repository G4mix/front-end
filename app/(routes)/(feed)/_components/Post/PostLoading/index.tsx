import React from "react";
import { PostCommandsLoading } from "../PostCommands/PostCommandsLoading";
import { PostHeaderLoading } from "../PostHeader/PostHeaderLoading";
import { PostImageLoading } from "../PostImage/PostImageLoading";
import { PostMainLoading } from "../PostMain/PostMainLoading";
import { PostRoot } from "../PostRoot";

export const PostLoading = () => {
  return (
    <PostRoot>
      <PostHeaderLoading />
      <PostImageLoading />
      <PostMainLoading />
      <PostCommandsLoading />
    </PostRoot>
  );
};