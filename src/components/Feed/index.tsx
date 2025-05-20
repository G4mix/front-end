"use client";

import { useEffect, useState } from "react";
import { Post } from "../Post";
import { FeedHeader } from "./components";
import styles from "./styles.module.css";
import { getPosts } from "@/api/queries/posts";
import { IPost } from "@/interfaces/post";

export const Feed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const getAllPosts = async () => {
    const data = await getPosts({
      tab: "recommendations",
      since: new Date().toISOString(),
      page: 0,
      quantity: 8,
    });

    setPosts(data.data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <main className={styles.feedContainer}>
      <FeedHeader />

      <div className="w100">
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
      </div>
    </main>
  );
};
