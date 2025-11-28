"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "@/api";
import { QUERY_KEYS } from "@/api/keys";
import { IComment } from "@/interfaces/comment";
import { Comment } from "../Comment";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import styles from "./styles.module.css";

interface CommentWithRepliesProps {
  comment: IComment;
  isOwnComment: boolean;
  ideaId: string;
  userProfileId: string;
  isExpanded: boolean;
  onToggleReplies: () => void;
}

export const CommentWithReplies = ({
  comment,
  isOwnComment,
  ideaId,
  userProfileId,
  isExpanded,
  onToggleReplies,
}: CommentWithRepliesProps) => {
  const loadMoreRepliesRef = useRef<HTMLButtonElement>(null);

  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS_REPLIES, comment.id],
    queryFn: ({ pageParam = 0 }) =>
      getComments({
        ideaId,
        parentCommentId: comment.id,
        page: pageParam as number,
        quantity: 8,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled: isExpanded,
  });

  const allReplies = repliesData?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      <Comment
        comment={comment}
        isOwnComment={isOwnComment}
        ideaId={ideaId}
      />
      
      {comment.replies > 0 && (
        <button
          className={styles.toggleRepliesButton}
          onClick={onToggleReplies}
        >
          {isExpanded ? "Ocultar respostas" : `${comment.replies} respostas >`}
        </button>
      )}

      {isExpanded && (
        <div className={styles.repliesContainer}>
          {isLoadingReplies ? (
            <SpinnerLoading isPrimary={true} />
          ) : allReplies.length === 0 ? (
            <div className={styles.emptyReplies}>Nenhuma resposta encontrada</div>
          ) : (
            <>
              {allReplies.map((reply) => {
                const isOwnReply = reply.author.id === userProfileId;
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

              {hasNextPage && (
                <button
                  ref={loadMoreRepliesRef}
                  className={styles.loadMoreButton}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <SpinnerLoading isPrimary={true} />
                  ) : (
                    "Carregar mais respostas..."
                  )}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

