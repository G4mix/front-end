import { PostOptionsProvider } from "@contexts/post/PostOptionsContext";
import { notFound, redirect } from "next/navigation";
import { PostQueryManager } from "@classes/APIManager/posts/PostQueryManager";
import { exampleComments } from "@constants/exampleComments";
import { Comments } from "./comments/_components/Comments";
import { Heading } from "@components/Heading";
import { Navbar } from "@components/Navbar";
import { Post } from "../../(feed)/_components/Post";
import styles from "./page.module.css";
import React from "react";

const findData = async (id: string) => {
  return await PostQueryManager.findPostById(parseInt(id), { useServer: true });
};

const handleDeletePost = async () => {
  "use server";
  redirect("/");
};

export default async function SinglePostPage({ params }: { params: { id: string } }) {
  const comments = exampleComments();
  const post = await findData(params.id);
  if (!post || post.error) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <Navbar position="top" />
      <PostOptionsProvider className={styles.postDropdownContent}>
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
      </PostOptionsProvider>
    </main>
  );
}