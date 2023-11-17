"use client";

import { areBlobsEqual } from "@functions/areBlobsEquals";
import React, { createContext, useState, useContext, useCallback } from "react";

type CreatePostContextValuesProps = {
  tags: string[];
  images: Blob[];
  handleSelectTag: (tag: string) => void;
  handleUnselectTag: (tag: string) => void;
};

const CreatePostContext = createContext<CreatePostContextValuesProps>({
  tags: [], images: [],
  handleSelectTag: () => null, handleUnselectTag: () => null
});

type CreatePostProviderProps = {
  children: React.ReactNode;
};

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [images, setImages] = useState<Blob[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleSelectImage = useCallback((image: Blob) => {
    setImages((prevImages) => [...prevImages, image])
  }, []);

  const handleUnselectImage = useCallback((image: Blob) => {
    setImages((prevImages) => prevImages.filter((prevImage: Blob) => !areBlobsEqual(prevImage, image)));
  }, []);

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
    <CreatePostContext.Provider value={{ tags, handleSelectTag, handleUnselectTag, images }}>
      {children}
    </CreatePostContext.Provider>
  );
};

export const useCreatePostContext = () => {
  return useContext(CreatePostContext);
};