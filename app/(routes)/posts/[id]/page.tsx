import { exampleComments } from "@constants/exampleComments";
import { examplePosts } from "@constants/examplePosts";
import { Comments } from "./comments/_components/Comments";
import { Heading } from "@components/Heading";
import { Navbar } from "@components/Navbar";
import { Post } from "../../(feed)/_components/Post";
import styles from "./page.module.css";
import React from "react";

export const dynamicParams = true;

export default function SinglePostPage({ params }: { params: { id: string } }) {
  const comments = exampleComments();
  const post = examplePosts().find(post => post.id === parseInt(params.id));

  const handleDeletePost = () => {

  };

  return (
    <main className={styles.main}>
      <Navbar position="top" />
      <div className={styles.postZone}>
        <Post handleDeletePost={handleDeletePost} post={post!} />
      </div>
      <div className={styles.commentsArea}>
        <div className={styles.commentsHeading}>
          <Heading size="default">
            Comentários
          </Heading>
        </div>
        <Comments comments={comments} />
      </div>
    </main>
  );
}