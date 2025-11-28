"use client";

import { getIdeas } from "@/api/queries/idea";
import styles from "./styles.module.css";
import { MinifiedIdea } from "@/components/Idea/components/MinifiedIdea";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/keys";

interface IdeasProps {
  projectId: string;
}

export const Ideas = ({ projectId }: IdeasProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_IDEAS, projectId],
    queryFn: () =>
      getIdeas({
        projectId,
        page: 0,
        quantity: 20,
      }),
    enabled: !!projectId,
  });

  const ideas = data?.data ?? [];

  if (isLoading) {
    return <SpinnerLoading isPrimary={true} />;
  }

  return (
    <div className={styles.ideas}>
      <div className={styles.ideasHeader}>
        <h2 className={styles.title}>Ideias do Projeto</h2>
      </div>

      <div className={styles.ideasList}>
        {ideas.map((idea) => (
          <MinifiedIdea key={idea.id} idea={idea} />
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
