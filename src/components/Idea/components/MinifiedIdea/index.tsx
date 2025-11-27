"use client";

import { IIdea } from "@/interfaces/idea";

import Link from "next/link";
import styles from "../../styles.module.css";
import { useRouter } from "next/navigation";

interface IMinifiedIdeaProps {
  idea: IIdea;
}

export const MinifiedIdea = ({ idea }: IMinifiedIdeaProps) => {
  const hasTags = idea.tags.length > 0;
  const imageUrl = idea.images[0] || "/card.png";

  const router = useRouter();

  const handleClick = () => {
    router.push(`/idea/${idea.id}`);
  };

  return (
    <section
      onClick={handleClick}
      className={styles.minifiedIdea}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.ideaContent}>
        <h2 className={styles.title}>{idea.title}</h2>
        <Link href={`/profile/${idea.author.id}`} className={styles.owner}>
          @{idea.author.displayName}
        </Link>

        {hasTags && (
          <div className={styles.tags}>
            {idea.tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
