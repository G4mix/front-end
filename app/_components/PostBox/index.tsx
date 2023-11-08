import { Icon } from "@components/Icon";
import styles from "./PostBox.module.css";
import React from "react";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";

interface PostBoxProps {
  PostSession: { 
    username: string | null; 
    date: string | null; 
    icon: string | null; 
    like: string | null; 
    comment: string | null; 
    chart: string | null; };
  PostContent: { 
    title: string | null; 
    text: string | null; 
    image: string | null;
    video: string | null;};
}

export function PostBox({PostSession, PostContent}: PostBoxProps) {
  return (
    <div className={styles.PostBox}>
      <div className={styles.bgPostBox}>
        <div className={styles.PostBoxHead}>
          <div className={styles.PostBoxUser}>
            <Icon icon="user-circle" width={20} height={20} />
            <h5>{PostSession.username}</h5>
            <div className={styles.VerticalLine}>
              <Icon icon="minus" width={6} height={6} />
            </div>
            <div  className={styles.date}>{PostSession.date}</div>
          </div>
          <div className={styles.Ellipsis}>
            <Icon icon="ellipsis-h" width={16} height={16} />
          </div>
        </div>
          <div className={styles.PostBoxImage}>
              {PostContent.image !== null ? (
              <PostImage image={PostContent.image} />
              ) : null}
              {PostContent.video !== null ? (
              <PostVideo src={PostContent.image ?? ""} />
              ) : null}
          </div>
          <div className={styles.PostTitle}>{PostContent.title}</div>
          <div className={styles.PostText}>{PostContent.text}</div>
        <div className={styles.PostBoxItems}>
          <div className={styles.PostBoxItemsChildren}>
          <Icon icon="like" className="far" width={20} height={20} />
          <div className="PostBoxItemsChildrenText">{PostSession.like}</div>
          </div>
          <div className={styles.PostBoxItemsChildren}>
          <Icon icon="comment" width={20} height={20} />
          <div className="PostBoxItemsChildrenText">{PostSession.comment}</div>
          </div>
          <div className={styles.PostBoxItemsChildren}>
          <Icon icon="chart" width={20} height={20} />
          <div className="PostBoxItemsChildrenText">{PostSession.chart}</div>
          </div>
          <div className="PostBoxItemsChildren">
          <Icon icon="share" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
