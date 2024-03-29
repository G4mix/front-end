import { PostOptionsProvider } from "@contexts/post/PostOptionsContext";
import { notFound, redirect } from "next/navigation";
import { PostQueryManager } from "@classes/APIManager/posts/PostQueryManager";
import { Comments } from "./comments/_components/Comments";
import { Navbar } from "@components/Navbar";
import { Text } from "@components/Text";
import { Post } from "../../(feed)/_components/Post";
import styles from "./page.module.css";
import React from "react";


export default async function SinglePostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = await PostQueryManager.findPostById(postId, { useServer: true });
  if (!post || post.error) {
    notFound();
  }
  const handleDeletePost = async () => {
    "use server";
    redirect("/");
  };

  return (
    <main className={styles.main}>
      <Navbar position="top" />
      <PostOptionsProvider className={styles.postDropdownContent}>
        <div className={styles.post}>
          <div className={styles.postZone}>
            <Post handleDeletePost={handleDeletePost} post={post!} />
          </div>
          <div className={styles.commentsArea}>
            <Text size="default" className={styles.commentsHeading} asChild>
              <h2>Comentários</h2>
            </Text>
            <Comments postId={postId} />
          </div>
        </div>
      </PostOptionsProvider>
    </main>
  );
}