import type { PostType } from "@classes/APIManager/types/Models.types";
import { PostCommands } from "./PostCommands";
import { PostHeader } from "./PostHeader";
import { PostMain } from "./PostMain";
import { PostRoot } from "./PostRoot";
import React from "react";

type PostProps = {
  post: PostType;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostRoot>
      <PostHeader createdAt={post.createdAt!} updatedAt={post.updatedAt!} author={post.author} />
      {/* { post!.images && (<PostImage image={post!.images} />) }
      { post!.videos && (<PostVideo src={post!.images ?? ""} />) } */}
      <PostMain title={post.title!} content={post.content!} />
      <PostCommands likes={post.likes!} comments={post.comments!} views={post.views!} id={post.id} />
    </PostRoot>
  );
};
