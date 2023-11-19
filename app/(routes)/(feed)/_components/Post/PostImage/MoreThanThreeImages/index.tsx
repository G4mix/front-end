import type { PostImageProps } from "..";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import componentStyles from "./MoreThanThreeImages.module.css";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";

export const MoreThanThreeImages = ({ images, title }: PostImageProps) => {
  const remainingImages = images!.length - 4;
  const imagesToDisplay = images!.slice(0, 4);

  return (
    <div className={styles.postBoxImage} style={{flexDirection: "column"}}>
      {
        imagesToDisplay.reduce((chunks: string[][], _img: string, index: number) => {
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
                    <div className={componentStyles.lastImageWrapper} key={`post:image:${img}`}>
                      <Image
                        src={img}
                        width={500}
                        height={300}
                        quality={100}
                        alt={`Imagem do post: ${title!}`}
                        className={`${styles.image} ${componentStyles.lastImage}`}
                      />
                      <div className={componentStyles.remainingImages}>
                        <Icon icon="plus" className={componentStyles.icon} />
                        <Text size="xs">{remainingImages}</Text>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={img} key={`post:image:${img}`}
                      width={500}
                      height={300}
                      quality={100}
                      alt={`Imagem do post: ${title!}`}
                      className={styles.image}
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