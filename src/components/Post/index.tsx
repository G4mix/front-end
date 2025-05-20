import { IPost } from "@/interfaces/post";
import { PostActions } from "./components/PostActions";
import { PostBody } from "./components/PostBody";
import { PostHeader } from "./components/PostHeader";
import styles from "./style.module.css";
import { ptBR } from "date-fns/locale";
import { format, parseISO } from "date-fns";

interface IPostProps {
  post: IPost;
}

export const Post = ({ post }: IPostProps) => {
  const formattedDate = format(parseISO(post.created_at), "dd MMM. yy", {
    locale: ptBR,
  });

  return (
    <section className={styles.postContainer}>
      <PostHeader author={post.author} date={formattedDate} />

      <PostBody title={post.title} content={post.content} images={post.images}/>

      <PostActions />
    </section>
  );
};
