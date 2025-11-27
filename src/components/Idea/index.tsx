"use client";

import { IIdea } from "@/interfaces/idea";
import styles from "./styles.module.css";
import Link from "next/link";
import { FaCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toggleLike } from "@/api/mutations/like";
import { recordView } from "@/api/mutations/idea";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { IToggleLike } from "@/interfaces/like";
import { CollaborationModal } from "./components/CollaborationModal";
import { useRouter } from "next/navigation";

interface IIdeaProps {
  idea: IIdea;
}

export const Idea = ({ idea: initialIdea }: IIdeaProps) => {
  const [idea, setIdea] = useState(initialIdea);

  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  const router = useRouter();

  const hasTags = idea.tags.length > 0;
  const imageUrl = idea.images[0] || "/card.png";

  const { mutate: recordViewMutation } = useMutation({
    mutationFn: (targetIdeaId: string) => recordView(targetIdeaId),
    onError: (error) => {
      console.error("Erro ao registrar visualização:", error);
    },
  });

  const { mutate: toggleLikeMutation, isPending: isLoadingLike } = useMutation({
    mutationFn: (body: IToggleLike) => toggleLike(body),
    onSuccess: () => {
      setIdea((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      }));
    },
    onError: (error) => {
      toast.error("Erro ao curtir ideia");
      console.error("Erro ao dar like:", error);
    },
  });

  // Registrar view quando o componente for montado
  useEffect(() => {
    if (!idea.isViewed) {
      recordViewMutation(idea.id);
    }
  }, [idea.id, recordViewMutation, idea.isViewed]);

  const handleLike = async () => {
    if (isLoadingLike) return;

    toggleLikeMutation({
      targetLikeId: idea.id,
      likeType: "Idea",
    });
  };

  const handleCollaborate = () => {
    setShowCollaborationModal(true);
  };

  const pushToIdeaScreen = () => {
    router.push(`/idea/${idea.id}`);
  };

  return (
    <>
      <section
        className={styles.idea}
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

          <div className={styles.content} onClick={pushToIdeaScreen}>
            <p>{idea.content}</p>
          </div>

          <div className={styles.footer}>
            <div className={styles.likesComments}>
              <button
                onClick={handleLike}
                disabled={isLoadingLike}
                className={idea.isLiked ? styles.liked : ""}
              >
                {idea.isLiked ? (
                  <FaThumbsUp className={styles.icon} />
                ) : (
                  <FaRegThumbsUp className={styles.icon} />
                )}
                {idea.likes}
              </button>

              <button onClick={pushToIdeaScreen}>
                <FaCommentDots className={styles.icon} />
                {idea.comments}
              </button>
            </div>

            <button className={styles.colaborate} onClick={handleCollaborate}>
              Quero colaborar
            </button>
          </div>
        </div>
      </section>

      <CollaborationModal
        isOpen={showCollaborationModal}
        onClose={() => setShowCollaborationModal(false)}
        ideaId={idea.id}
      />
    </>
  );
};
