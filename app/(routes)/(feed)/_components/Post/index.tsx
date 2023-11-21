import type { PostType } from "@classes/APIManager/types/Models.types";
import { PostCommands } from "./PostCommands";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostLink } from "./PostLink";
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
      { post.images && post.images.length > 0 && (<PostImage images={post.images} title={post.title} />) }
      <PostMain title={post.title} content={post.content} />
      { post.links && post.links.map((link) => (<PostLink url={link.link} key={`link:${link.id}:${link.link}`} />)) }
      <PostCommands post={post} />
    </PostRoot>
  );
};
