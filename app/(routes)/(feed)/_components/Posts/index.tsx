"use client";

import type { PostType } from "@classes/APIManager/base/types/Models.types";
import { PostQueryManager } from "@classes/APIManager/posts/PostQueryManager";
import { PostLoading } from "../Post/PostLoading";
import { mergeArray } from "@functions/mergeArray";
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
    const allPosts = await PostQueryManager.findAllPosts(page);

    if (!allPosts || allPosts.error || allPosts.length === 0) {
      setSearching(false);
      return setAllPostsLoaded(true);
    }

    if (page === 0) {
      setSearching(false);
      return setPosts(allPosts);
    }

    if (allPosts.length < 10) setAllPostsLoaded(true);
    setSearching(false);
    setPosts(prevPosts => (mergeArray(prevPosts, allPosts) as PostType[]));
  };

  const handleGlobalScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollThreshold = 100;
  
    if (!searching && !allPostsLoaded && scrollHeight - scrollTop <= clientHeight + scrollThreshold) {
      setPage(prevPage => prevPage + 1);
    }
  }, [searching, allPostsLoaded]);

  const handleDeletePost = async (id: number) => {
    setPosts((prevPosts: PostType[]) => prevPosts.filter(prevPost => id !== prevPost!.id!));
  };
  
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
              handleDeletePost={() => handleDeletePost(post!.id!)}
            />
          )
        )
      }
      {
        searching && (
          [1, 2, 3].map((value) => <PostLoading key={`postloading:${value}`} />)
        )
      }
    </div>
  );
};