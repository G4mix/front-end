"use client";

import type { PostType } from "@classes/APIManager/types/Models.types";
import { Client, type IFrame, type IMessage } from "@stomp/stompjs";
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

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000
    });

    client.activate();

    client.onConnect = () => {
      client.subscribe("/topic/feed", function (message: IMessage) {
        console.log("Received message:", message.body);
      });
    };

    client.onStompError = (frame: IFrame) => {
      console.error("WebSocket error:", frame.headers.message);
    };
    
    client.onWebSocketError = (error: Event) => {
      console.error("WebSocket connection error:", error);
    };

    return () => {
      client.deactivate();
    };
  }, []);

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