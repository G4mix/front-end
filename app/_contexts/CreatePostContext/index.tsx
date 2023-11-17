"use client";

import type { icons } from "@constants/icons";
import { Toast, type ToastHandlers } from "@components/Toast";
import React, { createContext, useState, useContext, useCallback, useRef } from "react";
import styles from "./CreatePostContext.module.css";

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
  handleShowMessage: (message: string, icon?: keyof typeof icons) => void;
};

const CreatePostContext = createContext<CreatePostContextValuesProps>({
  tags: [], images: [], openAddLink: false, links: [],
  handleSelectTag: () => null, handleUnselectTag: () => null,
  handleSelectImage: () => null, handleUnselectImage: () => null,
  handleAddLink: () => null, handleRemoveLink: () => null,
  handleToggleAddLink: () => null, handleShowMessage: () => null
});

type CreatePostProviderProps = {
  children: React.ReactNode;
};

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [tryingToPost, setTryingToPost] = useState(false);
  const [openAddLink, setOpenAddLink] = useState(false);
  const [images, setImages] = useState<{ link: string; image: File }[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const toastRef = useRef<ToastHandlers>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleShowMessage = useCallback((message: string, icon?: keyof typeof icons) => {
    toastRef.current?.showMessage(message, icon);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToPost) return;
    setTryingToPost(true);

    const formData = new FormData(formRef.current || e.currentTarget);
    const post = {
      title: formData.get("post_title")?.valueOf() as string,
      content: formData.get("post_content")?.valueOf() as string,
      images,
      links,
      tags
    };

    console.log(post);
  };

  return (
    <CreatePostContext.Provider 
      value={{ 
        tags, handleSelectTag, handleUnselectTag,
        images, handleSelectImage, handleUnselectImage,
        links, handleAddLink, handleRemoveLink,
        openAddLink, handleToggleAddLink, handleShowMessage
      }}
    >
      <Toast ref={toastRef} />
      <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
        {children}
      </form>
    </CreatePostContext.Provider>
  );
};

export const useCreatePostContext = () => {
  return useContext(CreatePostContext);
};