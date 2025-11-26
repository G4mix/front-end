import { IIdea } from "@/interfaces/idea";
import { IdeaActions } from "./components/IdeaActions";
import { IdeaBody } from "./components/IdeaBody";
import { IdeaHeader } from "./components/IdeaHeader";
import styles from "./style.module.css";
import { ptBR } from "date-fns/locale";
import { format, parseISO } from "date-fns";

interface IIdeaProps {
  idea: IIdea;
}

export const Idea = ({ idea }: IIdeaProps) => {
  const formattedDate = format(parseISO(idea.createdAt), "dd MMM. yy", {
    locale: ptBR,
  });

  return (
    <section className={styles.ideaContainer}>
      <IdeaHeader author={idea.author} date={formattedDate} />

      <IdeaBody
        title={idea.title}
        content={idea.content}
        images={idea.images}
      />

      <IdeaActions
        likesCount={idea.likes}
        commentsCount={idea.comments}
        viewsCount={idea.views}
        isLiked={idea.isLiked}
      />
    </section>
  );
};
