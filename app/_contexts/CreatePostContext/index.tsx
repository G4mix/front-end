"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

type CreatePostContextValuesProps = {
  tags: string[];
  handleSelectTag: (tag: string) => void;
  handleUnselectTag: (tag: string) => void;
};

const CreatePostContext = createContext<CreatePostContextValuesProps>({ tags: [], handleSelectTag: () => null, handleUnselectTag: () => null });

type CreatePostProviderProps = {
  children: React.ReactNode;
};

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleSelectTag = useCallback((tag: string) => {
    setTags((prevTags) => {
      if (prevTags.includes(tag)) return prevTags;
      return [...prevTags, tag];
    });
  }, []);

  const handleUnselectTag = useCallback((tag: string) => {
    setTags((prevTags) => prevTags.filter((prevTag: string) => prevTag !== tag));
  }, []);

  return (
    <CreatePostContext.Provider value={{ tags, handleSelectTag, handleUnselectTag }}>
      {children}
    </CreatePostContext.Provider>
  );
};

export const useCreatePostContext = () => {
  return useContext(CreatePostContext);
};