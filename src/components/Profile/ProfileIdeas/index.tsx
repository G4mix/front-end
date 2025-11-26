"use client";

import { useEffect, useState } from "react";
import { getIdeas } from "@/api/queries/idea";
import { IIdea } from "@/interfaces/idea";
import { Idea } from "@/components/Idea";
import styles from "./styles.module.css";

interface ProfileIdeasProps {
  userProfileId: string;
}

export const ProfileIdeas = ({ userProfileId }: ProfileIdeasProps) => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getIdeas({
          authorId: userProfileId,
          page: 0,
          quantity: 10,
        });
        setIdeas(data.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [userProfileId]);

  if (loading) {
    return <div className={styles.loading}>Carregando ideias...</div>;
  }

  return (
    <div className={styles.ideas}>
      <h2 className={styles.title}>Minhas Ideias</h2>
      <div className={styles.ideasList}>
        {ideas.map((idea) => (
          <Idea key={idea.id} idea={idea} />
        ))}
      </div>

      {ideas.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhuma ideia publicada ainda</p>
        </div>
      )}
    </div>
  );
};

