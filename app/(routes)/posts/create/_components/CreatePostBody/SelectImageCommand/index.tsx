"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { Icon } from "@components/Icon";
import React, { useRef, useCallback } from "react";
import styles from "../CreatePostBody.module.css";

export const SelectImageCommand = () => {
  const { handleSelectImage } = useCreatePostContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const generateRandomFileName = useCallback(() => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    return `image_${timestamp}_${randomString}`;
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    const fileName = selectedFile.name || generateRandomFileName();
    handleSelectImage(new File([selectedFile], fileName));
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Icon icon="image" className={styles.postCommandIcon} onClick={handleImageUpload} />
    </>
  );
};