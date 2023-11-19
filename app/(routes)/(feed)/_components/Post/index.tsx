import type { PostType } from "@classes/APIManager/types/Models.types";
import { PostCommands } from "./PostCommands";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostMain } from "./PostMain";
import { PostRoot } from "./PostRoot";
import React from "react";

type PostProps = {
  post: PostType;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostRoot>
      <PostHeader createdAt={post.createdAt} updatedAt={post.updatedAt} author={post.author} />
      {/* { post!.images && (<PostImage images={post.images} title={post.title} />) } */}
      <PostImage images={post.images} title={post.title} />
      <PostMain title={post.title} content={post.content} />
      <PostCommands post={post} />
    </PostRoot>
  );
};
