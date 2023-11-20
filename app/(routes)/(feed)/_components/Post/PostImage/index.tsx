"use client";

import type { PostType } from "@classes/APIManager/types/Models.types";
import { MoreThanThreeImages } from "./MoreThanThreeImages";
import { ImagesModalHandler, PostImagesModal } from "./PostImagesModal";
import { SingleImage } from "./SingleImage";
import { ThreeImages } from "./ThreeImages";
import { TwoImages } from "./TwoImages";
import React, { useCallback, useRef } from "react";

export type PostImageProps = Pick<PostType, "images" | "title">;

export const PostImage = ({ images=[], title }: PostImageProps) => {
  images = [
    "https://images.pexels.com/photos/1629061/pexels-photo-1629061.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/14681761/pexels-photo-14681761.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/13618517/pexels-photo-13618517.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  if (images.length === 0) return null;

  const imagesModalRef = useRef<ImagesModalHandler>(null);
  
  const handleOpenModal = useCallback((selectedImage: string) => {
    imagesModalRef.current?.handleOpenModal(selectedImage);
  }, []);

  const renderImageLogic = {
    1: () => <SingleImage images={images} title={title} />,
    2: () => <TwoImages images={images} title={title} handleOpenModal={handleOpenModal} />,
    3: () => <ThreeImages images={images} title={title} handleOpenModal={handleOpenModal} />,
    4: () => <MoreThanThreeImages images={images} title={title} handleOpenModal={handleOpenModal} />
  };

  const RenderImages = renderImageLogic[images.length as keyof typeof renderImageLogic] || renderImageLogic[4];
  return (
    <>
      <PostImagesModal images={images} title={title} ref={imagesModalRef} />
      <RenderImages />
    </>
  );
};