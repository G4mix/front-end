import { PostActions } from "./components/PostActions";
import { PostBody } from "./components/PostBody";
import { PostHeader } from "./components/PostHeader";
import styles from "./style.module.css";

export const Post = () => {
  return (
    <section className={styles.postContainer}>
      <PostHeader />

      <PostBody />

      <PostActions />
    </section>
  );
};
