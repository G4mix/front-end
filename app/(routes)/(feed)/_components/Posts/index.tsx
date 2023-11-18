"use client";

import type { PostType } from "@classes/APIManager/types/Models.types";
import { APIManager } from "@classes/APIManager";
import { Post } from "../Post";
import React, { useEffect, useState } from "react";
import styles from "./Posts.module.css";

export const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);

  const getPosts = async () => {
    const allPosts = await APIManager.findAllPosts(page*10);
    if (!allPosts || allPosts.length === 0) return;
    setPosts(prevPosts => [...prevPosts, ...allPosts]);
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div onScroll={handleScroll} className={styles.posts}>
      {
        posts && posts.length > 0  && (
          posts.map((post) => 
            <Post
              key={`post:${post!.id}`}
              post={post}
            />
          )
        )
      }
    </div>
  );
}