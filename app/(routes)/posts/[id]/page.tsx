import type { PostType } from "@classes/APIManager/types/Models.types";
import { examplePosts } from "@constants/examplePosts";
import { Post } from "../../(feed)/_components/Post";
import React from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts: PostType[] = examplePosts();
 
  return posts.map((post) => ({
    id: post!.id!.toString(),
  }));
}

export default function SinglePostPage({ params }: { params: { id: string } }) {
  const post = examplePosts().find(post => post.id === parseInt(params.id));

  return (
    <Post post={post!} />
  );
}