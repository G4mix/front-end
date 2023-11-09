import { Icon } from "@components/Icon";
import styles from "./PostBox.module.css";
import React, { useState } from "react";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";

interface PostProps {
  PostSession: {
    username: string | null;
    date: string | null;
    icon: string | null;
    like: string | null;
    comment: string | null;
    chart: string | null;
  };
  PostContent: {
    title: string | null;
    text: string | null;
    image: string | null;
    video: string | null;
  };
}

export function Post({ PostSession, PostContent }: PostProps) {
  const [ isLiked, setIsliked ] = useState(false);

  const HandleLikeClick = () => {
    setIsliked(!isLiked);
  };

  return (
    <div className={styles.postBox}>
      <div className={styles.bgPostBox}>
        <div className={styles.postBoxHead}>
          <div className={styles.postBoxUser}>
            <Icon icon="user-circle" width={25} height={25} style={{color: "#000000",}}/>
            <h5>{PostSession.username}</h5>
            <div className={styles.verticalLine}>
              <Icon icon="minus" width={6} height={6} />
            </div>
            <div className={styles.date}>{PostSession.date}</div>
          </div>
          <div className={styles.ellipsis}>
            <Icon icon="ellipsis-h" width={16} height={16} />
          </div>
        </div>
        <div className={styles.postBoxImage}>
          {PostContent.image !== null ? (
            <PostImage image={PostContent.image} />
          ) : null}
          {PostContent.video !== null ? (
            <PostVideo src={PostContent.image ?? ""} />
          ) : null}
        </div>
        <div className={styles.postTitle}>{PostContent.title}</div>
        <div className={styles.postText}>{PostContent.text}</div>
        <div className={styles.postBoxItems}>
          <div className={styles.postBoxItemsChildren}>
            <div onClick={HandleLikeClick}>
              <Icon icon={isLiked ? "liked" : "like"} width={20} height={20} />
            </div>
            <div className={styles.postBoxItemsChildrenText}>{PostSession.like}</div>
          </div>
          <div className={styles.postBoxItemsChildren}>
            <Icon icon="comments" width={20} height={20} />
            <div className="PostBoxItemsChildrenText">{PostSession.comment}</div>
          </div>
          <div className={styles.postBoxItemsChildren}>
            <Icon icon="chart" width={20} height={20} />
            <div className="PostBoxItemsChildrenText">{PostSession.chart}</div>
          </div>
          <div className={styles.postBoxItemsChildren}>
            <Icon icon="share" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
