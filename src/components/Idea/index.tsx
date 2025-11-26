"use client";

import { IIdea } from "@/interfaces/idea";
import styles from "./style.module.css";
import Link from "next/link";
import { FaCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toggleLike } from "@/api/mutations/like";
import { recordView } from "@/api/mutations/idea";
import { createCollaborationRequest } from "@/api/mutations/collaboration";
import { CommentsSection } from "./components/CommentsSection";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { IToggleLike } from "@/interfaces/like";
import { ICreateCollaborationRequest } from "@/interfaces";

interface IIdeaProps {
  idea: IIdea;
}

export const Idea = ({ idea: initialIdea }: IIdeaProps) => {
  const [idea, setIdea] = useState(initialIdea);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);
  const [collaborationMessage, setCollaborationMessage] = useState("");

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
    onSuccess: (data) => {
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

  const {
    mutate: createCollaborationRequestMutation,
    isPending: isLoadingCollaboration,
  } = useMutation({
    mutationFn: (body: ICreateCollaborationRequest) =>
      createCollaborationRequest(body),
    onSuccess: () => {
      toast.success("Solicitação de colaboração enviada!");
      setShowCollaborationModal(false);
      setCollaborationMessage("");
    },
    onError: (error) => {
      toast.error("Erro ao enviar solicitação");
      console.error("Erro ao solicitar colaboração:", error);
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

  const handleSendCollaboration = async () => {
    if (!collaborationMessage.trim()) {
      toast.error("Por favor, escreva uma mensagem");
      return;
    }

    createCollaborationRequestMutation({
      ideaId: idea.id,
      message: collaborationMessage,
    });
  };

  return (
    <>
      <section
        className={styles.idea}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles.ideaContent}>
          <h2 className={styles.title}>{idea.title}</h2>
          <Link href={`/profiles/${idea.author.id}`} className={styles.owner}>
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

          <div className={styles.content}>
            <p>{idea.content}</p>
          </div>

          <div className={styles.footer}>
            <div className={styles.likesComments}>
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={idea.isLiked ? styles.liked : ""}
              >
                {idea.isLiked ? (
                  <FaThumbsUp className={styles.icon} />
                ) : (
                  <FaRegThumbsUp className={styles.icon} />
                )}
                {idea.likes}
              </button>

              <button onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
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

      {showCollaborationModal && (
        <div
          className={styles.modal}
          onClick={() => setShowCollaborationModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Solicitar Colaboração</h3>
            <p>Conte ao autor por que você quer colaborar nesta ideia:</p>
            <textarea
              value={collaborationMessage}
              onChange={(e) => setCollaborationMessage(e.target.value)}
              placeholder="Ex: Tenho experiência em backend e adoraria ajudar..."
              rows={5}
            />
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowCollaborationModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleSendCollaboration}
                disabled={isCollaborating}
                className={styles.sendButton}
              >
                {isCollaborating ? "Enviando..." : "Enviar Solicitação"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCommentsOpen && (
        <CommentsSection
          ideaId={idea.id}
          onClose={() => setIsCommentsOpen(false)}
          onCommentCreated={() => {
            setIdea((prev) => ({
              ...prev,
              comments: prev.comments + 1,
            }));
          }}
        />
      )}
    </>
  );
};
