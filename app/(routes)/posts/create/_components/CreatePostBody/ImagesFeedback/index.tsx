"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState, useEffect } from "react";
import styles from "./DropImages.module.css";

export const DropImages = () => {
  const { handleSelectImage } = useCreatePostContext();
  const [isVisible, setIsVisible] = useState(false);

  const handleFiles = (files: File[]) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    for (const image in imageFiles) {
      handleSelectImage(imageFiles[image]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsVisible(true);
  };

  const handleDragLeave = (_e: DragEvent) => {
    setIsVisible(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsVisible(false);

    const files = e.dataTransfer!.files;
    handleFiles(Array.from(files));
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData!.items;
    const files = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file" && item.type.includes("image")) {
        const file = item.getAsFile()!;
        files.push(file);
      }
    }
    handleFiles(files);
  };

  useEffect(() => {
    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("dragleave", handleDragLeave);
    document.body.addEventListener("drop", handleDrop);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("dragleave", handleDragLeave);
      document.body.removeEventListener("drop", handleDrop);
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.dropImages}>
      <Icon icon="cloud-arrow-up" className={styles.dropImageIcon} />
      <Text size="md" weight="medium">Solte para enviar</Text>
    </div>
  );
};