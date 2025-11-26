"use client";

import { useState, useEffect } from "react";
import { getComments } from "@/api/queries/comment";
import { createComment } from "@/api/mutations/comment";
import { toggleLike } from "@/api/mutations/like";
import { IComment } from "@/interfaces/comment";
import styles from "./styles.module.css";
import { FaRegThumbsUp, FaThumbsUp, FaTimes } from "react-icons/fa";
import { toast } from "@/utils/toast";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/keys";

interface CommentsSectionProps {
  ideaId: string;
  onClose: () => void;
  onCommentCreated: () => void;
}

export const CommentsSection = ({
  ideaId,
  onClose,
  onCommentCreated,
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, ideaId, page],
    queryFn: () =>
      getComments({
        ideaId,
        page,
        quantity: 10,
      }),
  });

  useEffect(() => {
    if (error) {
      toast.error("Erro ao carregar comentários");
      console.error("Erro ao carregar comentários:", error);
    }
  }, [error]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("Escreva um comentário");
      return;
    }

    setIsSubmitting(true);

    try {
      const comment = await createComment({
        ideaId,
        content: newComment,
      });

      setNewComment("");
      onCommentCreated();

      toast.success("Comentário adicionado!");
    } catch (error) {
      toast.error("Erro ao adicionar comentário");
      console.error("Erro ao criar comentário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await toggleLike({
        targetLikeId: commentId,
        likeType: "Comment",
      });
    } catch (error) {
      toast.error("Erro ao curtir comentário");
      console.error("Erro ao dar like:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Comentários</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            rows={3}
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? "Enviando..." : "Comentar"}
          </button>
        </form>

        <div className={styles.commentsList}>
          {isLoading && page === 0 ? (
            <div className={styles.loading}>Carregando comentários...</div>
          ) : comments?.data.length === 0 ? (
            <div className={styles.empty}>
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </div>
          ) : (
            <>
              {comments?.data.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    {comment?.author?.icon ? (
                      <Image
                        src={comment?.author?.icon}
                        alt={comment?.author?.displayName}
                        width={40}
                        height={40}
                        className={styles.avatar}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {comment?.author?.displayName.charAt(0)}
                      </div>
                    )}
                    <div className={styles.commentInfo}>
                      <strong>{comment?.author?.displayName}</strong>
                      <span className={styles.commentDate}>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                  </div>

                  <p className={styles.commentContent}>{comment.content}</p>

                  <div className={styles.commentActions}>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={comment.isLiked ? styles.liked : ""}
                    >
                      {comment.isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                    {comment.replies > 0 && (
                      <span className={styles.repliesCount}>
                        {comment.replies}{" "}
                        {comment.replies === 1 ? "resposta" : "respostas"}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className={styles.loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Carregando..." : "Carregar mais"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
