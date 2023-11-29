import type { PostImageProps } from "..";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import componentStyles from "./MoreThanThreeImages.module.css";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";

type MoreThanThreeImagesProps = {
  handleOpenModal?: (selectedImage: string) => void;
} & PostImageProps;

export const MoreThanThreeImages = ({ images, handleOpenModal }: MoreThanThreeImagesProps) => {
  const remainingImages = images!.length - 4;
  const imagesToDisplay = images!.slice(0, 4);

  return (
    <div className={`${styles.postBoxImage} ${componentStyles.postBoxImageGrid}`} style={{flexDirection: "column"}}>
      {
        imagesToDisplay.map((img, index) => 
          images!.length > 4 && index === imagesToDisplay.length - 1 ? (
            <div
              className={componentStyles.lastImageWrapper}
              onClick={() => { if (handleOpenModal) handleOpenModal(img!.src!); }}
              key={`post:image:${img}`}
            >
              <Image
                src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img!.src!}`}
                width={img!.width}
                height={img!.height}
                quality={100}
                alt={`Imagem: ${img!.name!}`}
                className={`${styles.image} ${componentStyles.lastImage}`}
              />
              <div className={componentStyles.remainingImages}>
                <Icon icon="plus" className={componentStyles.icon} />
                <Text size="xs">{remainingImages}</Text>
              </div>
            </div>
          ): (
            <Image
              src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img.src!}`} key={`post:image:${img.src}`}
              width={img.width}  height={img.height}
              quality={100} alt={`Imagem: ${img.name!}`}
              className={styles.image}
              onClick={() => { if (handleOpenModal) handleOpenModal(img.src!); }}
            />
          )
        )
      }
    </div>
  );
};