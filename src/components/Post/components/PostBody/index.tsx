import { FaImage } from "react-icons/fa6";
import styles from "../../style.module.css";
import { ImageDisplay } from "@/components/ImageDisplay";

export const PostBody = () => {
  return (
    <article className={styles.postBody}>
      <h3>Lorem Ipsum</h3>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic est ad
        assumenda exercitationem illo veniam voluptas nemo officia, quo commodi
        facere pariatur aliquam ullam, inventore cupiditate fugiat eligendi
        blanditiis dolorum.
      </p>

      <ImageDisplay />
    </article>
  );
};
