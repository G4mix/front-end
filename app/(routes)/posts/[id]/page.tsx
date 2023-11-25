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

export default async function SinglePostPage({ params }: { params: { id: string } }) {
  const comments = exampleComments();
  const post = await findData(params.id);
  if (!post) {
    console.log("erro");
    return null;
  }

  return (
    <main className={styles.main}>
      <Navbar position="top" />
      <div className={styles.postZone}>
        <Post post={post!} />
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