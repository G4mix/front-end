"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

type CreatePostContextValuesProps = {
  tags: string[];
  images: { link: string; image: File }[];
  links: string[];
  openAddLink: boolean;
  handleSelectTag: (tag: string) => void;
  handleUnselectTag: (tag: string) => void;
  handleSelectImage: (image: File) => void;
  handleUnselectImage: (image: File) => void;
  handleAddLink: (url: string) => void;
  handleRemoveLink: (url: string) => void;
  handleToggleAddLink: () => void;
};

const CreatePostContext = createContext<CreatePostContextValuesProps>({
  tags: [], images: [], openAddLink: false, links: [],
  handleSelectTag: () => null, handleUnselectTag: () => null,
  handleSelectImage: () => null, handleUnselectImage: () => null,
  handleAddLink: () => null, handleRemoveLink: () => null,
  handleToggleAddLink: () => null
});

type CreatePostProviderProps = {
  children: React.ReactNode;
};

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [images, setImages] = useState<{ link: string; image: File }[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [openAddLink, setOpenAddLink] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const handleSelectImage = useCallback((image: File) => {
    setImages((prevImages) => {
      const isImagePresent = prevImages.some((prevImage) => prevImage.image.name === image.name);
      if (isImagePresent) return prevImages;
      return [...prevImages, { link: URL.createObjectURL(image), image }];
    });
  }, []);

  const handleUnselectImage = useCallback((image: File) => {
    setImages((prevImages) => {
      const filteredImages = prevImages.filter(
        (prevImage: { link: string; image: File }) => prevImage.image.name !== image.name
      );
      const imageToRevoke = prevImages.find(
        (prevImage: { link: string; image: File }) => prevImage.image.name === image.name
      );
      if (imageToRevoke) URL.revokeObjectURL(imageToRevoke.link);
      return filteredImages;
    });
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

  const handleToggleAddLink = useCallback(() => {
    setOpenAddLink((isOpen) => !isOpen);
  }, []);

  const handleAddLink = useCallback((url: string) => {
    setLinks((prevLinks) => {
      if (prevLinks.includes(url)) return prevLinks;
      return [...prevLinks, url];
    });
  }, []);

  const handleRemoveLink = useCallback((url: string) => {
    setLinks((prevLinks) => prevLinks.filter((prevLink: string) => prevLink !== url));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <CreatePostContext.Provider 
      value={{ 
        tags, handleSelectTag, handleUnselectTag,
        images, handleSelectImage, handleUnselectImage,
        links, handleAddLink, handleRemoveLink,
        openAddLink, handleToggleAddLink
      }}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </CreatePostContext.Provider>
  );
};

export const useCreatePostContext = () => {
  return useContext(CreatePostContext);
};