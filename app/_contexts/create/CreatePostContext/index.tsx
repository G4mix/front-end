"use client";

import type { CreatePostInput, UpdatePostInput } from "@classes/APIManager/base/types/Inputs.types";
import { PostMutationManager } from "@classes/APIManager/posts/PostMutationManager";
import { useMessagesContext } from "@contexts/global/MessagesContext";
import { CreatePostPosting } from "@/app/(routes)/posts/create/_components/CreatePostPosting";
import { apiErrors } from "@constants/apiErrors";
import { useRouter } from "next/navigation";
import { PostType } from "@classes/APIManager/base/types/Models.types";
import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from "react";
import styles from "./CreatePostContext.module.css";

type CreatePostContextValuesProps = {
  tags: string[];
  images: { link: string; image: File }[];
  links: string[];
  openAddLink: boolean;
  handleSelectTag: (tag: string) => void;
  handleUnselectTag: (tag: string) => void;
  handleSelectImage: (image: File) => void;
  handleUnselectImage: (link: string) => void;
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
  defaultPost?: PostType;
  children: React.ReactNode;
};

export const CreatePostProvider = ({ children, defaultPost }: CreatePostProviderProps) => {
  const { handleShowMessage } = useMessagesContext();
  const [tryingToPost, setTryingToPost] = useState(false);
  const [openAddLink, setOpenAddLink] = useState(false);
  const [images, setImages] = useState<{ link: string; image: File }[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const loadDefaultPost = async () => {
    const defaultTags = defaultPost!.tags!.map((tag) => tag.name!);
    if (defaultTags) setTags(defaultTags);

    const defaultLinks = defaultPost!.links!.map((link) => link.link!);
    if (defaultLinks) setLinks(defaultLinks);

    async function getDefaultImages() {
      if (!defaultPost!.images) return;
      const imagesPromises = defaultPost!.images!.map(async (img) => {
        const blob = new Blob([""], { type: "text/plain" });
        const file = new File([blob], img!.name!, { type: "text/plain" });

        return {
          link: `${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img!.src!}`,
          image: file
        };
      });
      return Promise.all(imagesPromises);
    }

    const defaultImages = await getDefaultImages();
    if (defaultImages) setImages(defaultImages);
  };

  useEffect(() => {
    if (defaultPost) {
      loadDefaultPost();
    }
    return () => {
      setImages([]);
      setLinks([]);
      setTags([]);
    };
  }, []);

  const handleSelectImage = useCallback((image: File) => {
    if(image.size > 1048576) {
      handleShowMessage("O tamanho da imagem não deve ultrapassar 1mb!");
      return;
    }

    setImages((prevImages) => {
      if (prevImages.length === 8) {
        handleShowMessage("O limite de imagens é 8!");
        return prevImages;
      }

      const isImagePresent = prevImages.some((prevImage) => prevImage.image!.name === image.name);
      if (isImagePresent) return prevImages;
      return [...prevImages, { link: URL.createObjectURL(image), image }];
    });
  }, []);

  const handleUnselectImage = useCallback((link: string) => {
    setImages((prevImages) => {
      const filteredImages = prevImages.filter(
        (prevImage: { link: string; image: File }) => prevImage.link !== link
      );
      const imageToRevoke = prevImages.find(
        (prevImage: { link: string; image: File }) => prevImage.link === link
      );
      if (!link.includes(process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]!) && imageToRevoke) {
        URL.revokeObjectURL(imageToRevoke.link);
      }
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
    if (images.length > 5) {
      return handleShowMessage("O limite de links é 5!");
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToPost) return;
    const formData = new FormData(formRef.current || e.currentTarget);
    setTryingToPost(true);
    
    const title = formData.get("post_title")?.valueOf() as string;
    const content = formData.get("post_content")?.valueOf() as string;
    const post = {
      title, content,
      images: images.length > 0 ? images.map(img => img.image) : undefined,
      links: links.length > 0 ? links : undefined,
      tags: tags.length > 0 ? tags : undefined
    };

    const postData = defaultPost
      ? await PostMutationManager.updatePost({ id: defaultPost!.id!, ...post } as UpdatePostInput)
      : await PostMutationManager.createPost(post as CreatePostInput);

    if(postData!.error) {
      setTryingToPost(false);
      if (apiErrors.includes(postData!.error!)) {
        return handleShowMessage(postData!.message!);
      }
      return handleShowMessage(`Falha ao ${ defaultPost ? "atualizar" : "criar" } o post...`);
    }

    router.push("/");
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
      <CreatePostPosting tryingToPost={tryingToPost} mode={defaultPost ? "update" : "create"} />
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