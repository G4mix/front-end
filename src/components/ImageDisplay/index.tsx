import { FaImage } from "react-icons/fa6";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

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
          width={350}
          height={150}
          className={styles.img}
        />
      ) : (
        <FaImage className={styles.imgIcon} />
      )}
    </div>
  );
};
