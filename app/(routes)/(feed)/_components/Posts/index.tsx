"use client";

import type { PostType } from "@classes/APIManager/types/Models.types";
import { APIManager } from "@classes/APIManager";
import { Post } from "../Post";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./Posts.module.css";

export const Posts = () => {
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(0);

  const getPosts = async () => {
    if (searching) return;
    setSearching(true);
    const allPosts = await APIManager.findAllPosts(page);

    if (!allPosts || allPosts.length === 0) {
      setSearching(false);
      return setAllPostsLoaded(true);
    }

    if (page === 0) {
      setSearching(false);
      return setPosts(allPosts);
    }

    if (allPosts.length < 10) setAllPostsLoaded(true);
    setSearching(false);
    setPosts(prevPosts => [...prevPosts, ...allPosts]);
  };

  const handleGlobalScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop === clientHeight && !searching && !allPostsLoaded
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, [searching, allPostsLoaded]);
  
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll);
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, []);

  useEffect(() => {
    if (page !== 0 && !allPostsLoaded) getPosts();
  }, [page, allPostsLoaded]);
  
  return (
    <div className={styles.posts}>
      {
        posts && posts.length > 0  && (
          posts.map((post) => 
            <Post
              key={`post:${post!.id}:user:${post!.author!.id}`}
              post={post}
            />
          )
        )
      }
    </div>
  );
};