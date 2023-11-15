"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

type PostsContextValuesProps = {
  filterBy: "recent" | "highlights" | "following";
  handleFilterBy: (option: "recent" | "highlights" | "following") => void;
};

const PostsContext = createContext<PostsContextValuesProps>({ filterBy: "recent", handleFilterBy: () => null });

type PostsProviderProps = {
  children: React.ReactNode;
};

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [filterBy, setFilterBy] = useState<"recent" | "highlights" | "following">("recent");

  const handleFilterBy = useCallback((option: "recent" | "highlights" | "following") => {
    setFilterBy(option);
  }, []);

  return (
    <PostsContext.Provider value={{ filterBy, handleFilterBy }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};