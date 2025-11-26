import { FaRegCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import styles from "../../style.module.css";
import { FaShareAlt } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";

interface IIdeaActionsProps {
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isLiked: boolean;
}

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const IdeaActions = ({
  likesCount,
  commentsCount,
  viewsCount,
  isLiked,
}: IIdeaActionsProps) => {
  return (
    <footer className={styles.ideaActions}>
      <div className={styles.ideaAction}>
        {isLiked ? (
          <FaThumbsUp className={styles.ideaActionIcon} />
        ) : (
          <FaRegThumbsUp className={styles.ideaActionIcon} />
        )}
        <span>{formatCount(likesCount)}</span>
      </div>
      <div className={styles.ideaAction}>
        <FaRegCommentDots className={styles.ideaActionIcon} />
        <span>{formatCount(commentsCount)}</span>
      </div>
      <div className={styles.ideaAction}>
        <BsBarChartFill className={styles.ideaActionIcon} />
        <span>{formatCount(viewsCount)}</span>
      </div>
      <div className={styles.ideaAction}>
        <FaShareAlt className={styles.ideaActionIcon} />
      </div>
    </footer>
  );
};
