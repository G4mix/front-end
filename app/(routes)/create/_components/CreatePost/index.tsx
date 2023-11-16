import { CreatePostAuthor } from "../CreatePostAuthor";
import { CreatePostTitle } from "../CreatePostTitle";
import { CreatePostTags } from "../CreatePostTags";
import { CreatePostBody } from "../CreatePostBody";
import styles from "./CreatePost.module.css";
import React from "react";

export const CreatePost = () => {
  return (
    <div className={styles.createPost}>
      <CreatePostAuthor />
      <div className={styles.post}>
        <CreatePostTitle />
        <CreatePostBody />
        <CreatePostTags />
      </div>
    </div>
  );
};