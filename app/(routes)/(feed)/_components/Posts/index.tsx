import type { PostType } from "@classes/APIManager/types/Models.types";
import { Post } from "../Post";
import styles from "./Posts.module.css";
import React from "react";

type PostsProps = {
  posts: PostType[];
}

export function Posts({ posts }: PostsProps) {
  return (
    <div className={styles.posts}>
      {
        posts.map((post) => 
          <Post
            key={`post:${post!.id}`}
            post={post}
          />
        )
      }
    </div>
  );
}