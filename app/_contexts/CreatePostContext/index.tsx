"use client";

import type { icons } from "@constants/icons";
import { Toast, type ToastHandlers } from "@components/Toast";
import { CreatePostPosting } from "../../(routes)/posts/create/_components/CreatePostPosting";
import { APIManager } from "@classes/APIManager";
import { apiErrors } from "@constants/apiErrors";
import React, { createContext, useState, useContext, useCallback, useRef } from "react";
import styles from "./CreatePostContext.module.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToPost) return;
    const formData = new FormData(formRef.current || e.currentTarget);
    setTryingToPost(true);
    
    const title = formData.get("post_title")?.valueOf() as string;
    const content = formData.get("post_content")?.valueOf() as string;
    const post: CreatePostInput = {
      title, content,
      images: images.map(img => img.image),
      links, tags
    };

    const postData = await APIManager.createPost(post);

    if(!postData) handleShowMessage("Falha ao criar o post...");
    if (apiErrors[postData!.error as keyof typeof apiErrors]) {
      handleShowMessage(apiErrors[postData!.error as keyof typeof apiErrors]);
    }

    router.push("/");
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
      <CreatePostPosting tryingToPost={tryingToPost} />
      <Toast ref={toastRef} />
      {
        !tryingToPost && (
          <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
            {children}
          </form>
        )
      }
    </CreatePostContext.Provider>
  );
};

export const useCreatePostContext = () => {
  return useContext(CreatePostContext);
};