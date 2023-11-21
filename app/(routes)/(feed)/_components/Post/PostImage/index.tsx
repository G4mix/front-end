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
  const imagesModalRef = useRef<ImagesModalHandler>(null);
  
  const handleOpenModal = useCallback(() => {
    imagesModalRef.current?.handleOpenModal();
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
      { images.length > 1 && (<PostImagesModal images={images} title={title} ref={imagesModalRef} />) }
      <RenderImages />
    </>
  );
};