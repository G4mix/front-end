import type { PostImageProps } from "..";
import type { ImageType } from "@/app/_classes/APIManager/base/types/Models.types";
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
    <div className={styles.postBoxImage} style={{flexDirection: "column"}}>
      {
        imagesToDisplay.reduce((chunks: ImageType[][], _img: ImageType, index: number) => {
          if (index % 2 === 0) {
            chunks.push(images!.slice(index, index + 2));
          }
          return chunks;
        }, []).map((chunk, chunkIndex) => (
          <div className={styles.boxImage} key={`post:image:group:${chunkIndex}`}>
            {
              chunk.map((img, imgIndex) => (
                (chunkIndex === Math.ceil(imagesToDisplay.length / 2) - 1) &&
                (imgIndex === chunk.length - 1) && 
                (remainingImages > 0) ? (
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
                  ) : (
                    <Image
                      src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img!.src!}`} key={`post:image:${img!.src!}`}
                      width={img.width}
                      height={img.height}
                      quality={100}
                      alt={`Imagem: ${img.name!}`}
                      className={styles.image}
                      onClick={() => { if (handleOpenModal) handleOpenModal(img!.src!); }}
                    />
                  )
              ))
            }
          </div>
        ))
      }
    </div>
  );
};