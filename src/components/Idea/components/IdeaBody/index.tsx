import styles from "../../style.module.css";
import { ImageDisplay } from "@/components/ImageDisplay";

interface IIdeaBodyProps {
  title: string;
  content: string | null;
  images: string[];
}

export const IdeaBody = ({ content, title, images }: IIdeaBodyProps) => {
  const hasImage = images?.length > 0;

  return (
    <article className={styles.ideaBody}>
      <h3>{title}</h3>

      <p>{content}</p>

      {hasImage && <ImageDisplay image={{ src: images[0], alt: title }} />}
    </article>
  );
};
