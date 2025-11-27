"use client";

import { QUERY_KEYS } from "@/api/keys";
import styles from "./styles.module.css";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, getComments } from "@/api";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";
import { Comment } from "./components/Comment";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "@/utils/toast";

export const Comments = ({ ideaId }: { ideaId: string }) => {
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState("");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, ideaId],
    queryFn: ({ pageParam = 0 }) =>
      getComments({ ideaId, page: pageParam as number, quantity: 10 }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled: !!ideaId,
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allComments = data?.pages.flatMap((page) => page.data) ?? [];

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS, ideaId],
      });
      setCommentContent("");
      toast.success("Comentário criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar comentário");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      toast.error("Digite um comentário");
      return;
    }

    if (commentContent.length < 3 || commentContent.length > 200) {
      toast.error("O comentário deve ter entre 3 e 200 caracteres");
      return;
    }

    createCommentMutation.mutate({
      ideaId,
      content: commentContent.trim(),
    });
  };

  // Organizar comentários com suas respostas
  const topLevelComments = allComments.filter(
    (comment) => !comment.parentCommentId
  );

  const getReplies = (commentId: string) => {
    return allComments.filter(
      (comment) => comment.parentCommentId === commentId
    );
  };

  return (
    <div className={styles.comments}>
      <h3>Comentários</h3>

      <form className={styles.commentInputForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Criar um comentário"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          disabled={createCommentMutation.isPending}
        />
        <button
          type="submit"
          className={styles.iconBtn}
          disabled={createCommentMutation.isPending}
        >
          <HiMiniPaperAirplane size={24} />
        </button>
      </form>

      <div className={styles.commentsList}>
        {isLoading ? (
          <SpinnerLoading isPrimary={true} />
        ) : topLevelComments.length === 0 ? (
          <div className="emptyState">Nenhum comentário encontrado</div>
        ) : (
          <>
            {topLevelComments.map((comment) => {
              if (!userProfile) return null;

              const isOwnComment = comment.author.id === userProfile?.id;
              const replies = getReplies(comment.id);

              return (
                <div key={comment.id}>
                  <Comment
                    comment={comment}
                    isOwnComment={isOwnComment}
                    ideaId={ideaId}
                  />
                  {replies && replies.length > 0 && (
                    <div className={styles.repliesContainer}>
                      {replies.map((reply) => {
                        const isOwnReply = reply.author.id === userProfile?.id;
                        return (
                          <Comment
                            key={reply.id}
                            comment={reply}
                            isOwnComment={isOwnReply}
                            ideaId={ideaId}
                            isReply
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {hasNextPage && (
              <div ref={loadMoreRef} className={styles.loadMoreTrigger}>
                {isFetchingNextPage && <SpinnerLoading isPrimary={true} />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
