import { examplePosts } from "@constants/examplePosts";
import { Post } from "../Post";
import styles from "./Posts.module.css";
import React from "react";

export function Posts() {
  const posts = examplePosts();
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