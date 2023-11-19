import type { PostType } from "@classes/APIManager/types/Models.types";
import { MoreThanThreeImages } from "./MoreThanThreeImages";
import { SingleImage } from "./SingleImage";
import { ThreeImages } from "./ThreeImages";
import { TwoImages } from "./TwoImages";
import React from "react";

export type PostImageProps = Pick<PostType, "images" | "title">;

export const PostImage = ({ images=[], title }: PostImageProps) => {
  images = [
    "https://images.pexels.com/photos/1629061/pexels-photo-1629061.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/14681761/pexels-photo-14681761.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/13618517/pexels-photo-13618517.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  const renderImageLogic = [
    () => null,
    () => <SingleImage images={images} title={title} />,
    () => <TwoImages images={images} title={title} />,
    () => <ThreeImages images={images} title={title} />
  ];

  const RenderImages = renderImageLogic[images.length];
  if (!RenderImages) return <MoreThanThreeImages images={images} title={title} />;
  return <RenderImages />;
};