import { Image } from "@/interfaces/post";
import styles from "../../style.module.css";
import { ImageDisplay } from "@/components/ImageDisplay";

interface IPostBodyProps {
  title: string;
  content: string | null;
  images: Image[];
}

export const PostBody = ({ content, title, images }: IPostBodyProps) => {
  const hasImage = images?.length > 0;

  return (
    <article className={styles.postBody}>
      <h3>{title}</h3>

      <p>{content}</p>

      {hasImage && (
        <ImageDisplay image={{ src: images[0].src, alt: images[0].alt }} />
      )}
    </article>
  );
};
