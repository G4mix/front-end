import { FaImage } from "react-icons/fa6";
import styles from "./style.module.css";
import Image from "next/image";

interface IImageDisplay {
  image?: {
    src: string;
    alt?: string;
  };
}

export const ImageDisplay = ({ image }: IImageDisplay) => {
  return (
    <div className={styles.imgContainer}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt ?? ""}
          fill
          objectFit="cover"
          className={styles.img}
        />
      ) : (
        <FaImage className={styles.imgIcon} />
      )}
    </div>
  );
};
