"use client";

import type { PostType } from "@classes/APIManager/types/Models.types";
import { APIManager } from "@classes/APIManager";
import { Post } from "../Post";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Posts.module.css";

export const Posts = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(0);

  const getPosts = async () => {
    const allPosts = await APIManager.findAllPosts(page * 10);
    if (!allPosts || allPosts.length === 0) return setAllPostsLoaded(true);
    if (allPosts.length < 10) setAllPostsLoaded(true);
    
    if (page === 0) {
      setInitialLoadComplete(true);
      return setPosts(allPosts);
    }
    setPosts(prevPosts => [...prevPosts, ...allPosts]);
  };

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) setPage(prevPage => prevPage + 1);
  }, []);
  
  useEffect(() => {
    if (!initialLoadComplete) getPosts();
  }, [initialLoadComplete]);

  useEffect(() => {
    if (initialLoadComplete && !allPostsLoaded) getPosts();
  }, [page, allPostsLoaded, initialLoadComplete]);
  
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
};