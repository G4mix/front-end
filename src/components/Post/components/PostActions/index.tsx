import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa6";
import styles from "../../style.module.css";
import { FaShareAlt } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";

export const PostActions = () => {
  return (
    <footer className={styles.postActions}>
      <div className={styles.postAction}>
        <FaRegThumbsUp className={styles.postActionIcon} />
        <span>823K</span>
      </div>
      <div className={styles.postAction}>
        <FaRegCommentDots className={styles.postActionIcon} />
        <span>662K</span>
      </div>
      <div className={styles.postAction}>
        <BsBarChartFill className={styles.postActionIcon} />
        <span>22M</span>
      </div>
      <div className={styles.postAction}>
        <FaShareAlt className={styles.postActionIcon} />
      </div>
    </footer>
  );
};
