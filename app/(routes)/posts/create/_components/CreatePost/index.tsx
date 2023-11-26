import { CreatePostAuthor } from "../CreatePostAuthor";
import { CreatePostTitle } from "../CreatePostTitle";
import { CreatePostTags } from "../CreatePostTags";
import { CreatePostBody } from "../CreatePostBody";
import styles from "./CreatePost.module.css";
import React from "react";

type CreatePostProps = {
  defaultTitle?: string;
  defaultContent?: string;
};

export const CreatePost = ({ defaultTitle, defaultContent }: CreatePostProps) => {
  return (
    <div className={styles.createPost}>
      <CreatePostAuthor />
      <div className={styles.post}>
        <CreatePostTitle defaultTitle={defaultTitle} />
        <CreatePostBody defaultContent={defaultContent} />
        <CreatePostTags />
      </div>
    </div>
  );
};