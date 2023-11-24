"use client";

import type { PostType } from "@/app/_classes/APIManager/base/types/Models.types";
import { MoreThanThreeImages } from "./MoreThanThreeImages";
import { ImagesModalHandler, PostImagesModal } from "./PostImagesModal";
import { SingleImage } from "./SingleImage";
import { ThreeImages } from "./ThreeImages";
import { TwoImages } from "./TwoImages";
import React, { useCallback, useRef } from "react";

export type PostImageProps = Pick<PostType, "images">;

export const PostImage = ({ images=[] }: PostImageProps) => {
  const imagesModalRef = useRef<ImagesModalHandler>(null);
  
  const handleOpenModal = useCallback(() => {
    imagesModalRef.current?.handleOpenModal();
  }, []);

  const renderImageLogic = {
    1: () => <SingleImage images={images} />,
    2: () => <TwoImages images={images} handleOpenModal={handleOpenModal} />,
    3: () => <ThreeImages images={images} handleOpenModal={handleOpenModal} />,
    4: () => <MoreThanThreeImages images={images} handleOpenModal={handleOpenModal} />
  };

  const RenderImages = renderImageLogic[images.length as keyof typeof renderImageLogic] || renderImageLogic[4];
  return (
    <>
      { images.length > 1 && (<PostImagesModal images={images} ref={imagesModalRef} />) }
      <RenderImages />
    </>
  );
};