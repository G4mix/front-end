import { UserIcon } from "@/components/Users/UserIcon";
import styles from "../styles.module.css";
import { IComment } from "@/interfaces";
import Link from "next/link";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { FaThumbsUp } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, toggleLike } from "@/api";
import { QUERY_KEYS } from "@/api/keys";
import { toast } from "@/utils/toast";
import { FormEvent, useState } from "react";
import { HiMiniPaperAirplane } from "react-icons/hi2";

export const Comment = ({
  comment,
  isOwnComment,
  ideaId,
  isReply = false,
}: {
  comment: IComment;
  isOwnComment: boolean;
  ideaId: string;
  isReply?: boolean;
}) => {
  const queryClient = useQueryClient();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const toggleLikeMutation = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      if (isReply) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_COMMENTS_REPLIES, comment.parentCommentId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_COMMENTS, ideaId],
        });
      }
    },
    onError: () => {
      toast.error("Erro ao curtir comentário");
    },
  });

  const createReplyMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS, ideaId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS_REPLIES, comment.parentCommentId],
      });

      setReplyContent("");
      setIsReplying(false);
      toast.success("Resposta enviada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao enviar resposta");
    },
  });

  const handleLike = () => {
    toggleLikeMutation.mutate({
      targetLikeId: comment.id,
      likeType: "Comment",
    });
  };

  const handleReplySubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      toast.error("Digite uma resposta");
      return;
    }

    if (replyContent.length < 3 || replyContent.length > 200) {
      toast.error("A resposta deve ter entre 3 e 200 caracteres");
      return;
    }

    createReplyMutation.mutate({
      ideaId,
      content: replyContent.trim(),
      parentCommentId: isReply ? comment.parentCommentId! : comment.id,
    });
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <UserIcon
          displayName={comment.author.displayName}
          icon={comment.author.icon}
          size={16}
          fontSize={"0.625rem"}
        />
        <Link
          href={`/profile/${comment.author.id}`}
          className={isOwnComment ? styles.ownComment : ""}
        >
          {isOwnComment ? "Você" : `@${comment.author.displayName}`}
        </Link>{" "}
        • {formatRelativeTime(comment.createdAt)}
      </div>

      <p className={styles.commentContent}>{comment.content}</p>

      <div className={styles.commentActions}>
        <button
          onClick={handleLike}
          disabled={toggleLikeMutation.isPending}
          className={comment.isLiked ? styles.liked : ""}
        >
          <FaThumbsUp />
          {comment.likes}
        </button>
        {!isReply && (
          <button onClick={() => setIsReplying(!isReplying)}>
            {isReplying ? "Cancelar" : "Responder"}
          </button>
        )}
      </div>

      {isReplying && (
        <form className={styles.replyForm} onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Escrever uma resposta..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            disabled={createReplyMutation.isPending}
            autoFocus
          />
          <button
            type="submit"
            className={styles.iconBtn}
            disabled={createReplyMutation.isPending}
          >
            <HiMiniPaperAirplane size={20} />
          </button>
        </form>
      )}
    </div>
  );
};
