"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCollaborationRequest } from "@/api/queries/collaboration";
import { approveCollaborationRequest } from "@/api/mutations/collaboration";
import { QUERY_KEYS } from "@/api/keys";
import { toast } from "@/utils/toast";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { UserIcon } from "@/components/Users";
import { useRouter } from "next/navigation";

interface CollaborationResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaborationRequestId: string;
}

const MIN_FEEDBACK_LENGTH = 3;
const MAX_FEEDBACK_LENGTH = 255;

export const CollaborationResponseModal = ({
  isOpen,
  onClose,
  collaborationRequestId,
}: CollaborationResponseModalProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [feedback, setFeedback] = useState("");
  const [showError, setShowError] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "Approved" | "Rejected" | null
  >(null);

  const { data: collaborationRequest, isLoading } = useQuery({
    queryKey: ["collaboration-request", collaborationRequestId],
    queryFn: () => getCollaborationRequest(collaborationRequestId),
    enabled: isOpen && !!collaborationRequestId,
  });

  const approveCollaborationMutation = useMutation({
    mutationFn: ({
      status,
      feedback,
    }: {
      status: "Approved" | "Rejected";
      feedback: string;
    }) =>
      approveCollaborationRequest({
        collaborationRequestId,
        status,
        feedback,
      }),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UNREAD_COUNT],
      });
      queryClient.invalidateQueries({
        queryKey: ["collaboration-request", collaborationRequestId],
      });
      toast.success(
        status === "Approved"
          ? "Solicitação de colaboração aceita!"
          : "Solicitação de colaboração recusada"
      );
      router.push(`/projects`);
      handleClose();
    },
    onError: () => {
      toast.error("Erro ao processar solicitação");
      setPendingAction(null);
    },
  });

  const isValidFeedback = (value: string) => {
    const trimmed = value.trim();
    return trimmed.length >= MIN_FEEDBACK_LENGTH && trimmed.length <= MAX_FEEDBACK_LENGTH;
  };

  const isFeedbackValid = isValidFeedback(feedback);
  const feedbackLength = feedback.trim().length;
  const charactersRemaining = MIN_FEEDBACK_LENGTH - feedbackLength;

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, MAX_FEEDBACK_LENGTH);
    setFeedback(newValue);
    if (showError && isValidFeedback(newValue)) {
      setShowError(false);
    }
  };

  const handleAction = (action: "Approved" | "Rejected") => {
    if (!isFeedbackValid) {
      setShowError(true);
      return;
    }
    setPendingAction(action);
    approveCollaborationMutation.mutate({
      status: action,
      feedback: feedback.trim(),
    });
  };

  const handleClose = () => {
    setFeedback("");
    setShowError(false);
    setPendingAction(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setFeedback("");
      setShowError(false);
      setPendingAction(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isPending = collaborationRequest?.status === "Pending";
  const isApproved = collaborationRequest?.status === "Approved";

  return (
    <div className={styles.modal} onClick={handleClose}>
      <div
        className={`${styles.modalContent} ${styles.collaborationModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <SpinnerLoading isPrimary />
          </div>
        ) : (
          <>
            <h3>Solicitação de Colaboração</h3>

            {collaborationRequest?.requester && (
              <div className={styles.requesterInfo}>
                <UserIcon
                  displayName={collaborationRequest.requester.displayName}
                  icon={collaborationRequest.requester.icon}
                  size={40}
                  rounded={false}
                />
                <div className={styles.requesterDetails}>
                  <strong>@{collaborationRequest.requester.displayName}</strong>
                  <span className={styles.ideaTitle}>
                    {collaborationRequest.idea?.title}
                  </span>
                </div>
              </div>
            )}

            <div className={styles.requestMessage}>
              <p className={styles.messageLabel}>Mensagem:</p>
              <p className={styles.messageContent}>
                {collaborationRequest?.message}
              </p>
            </div>

            {!isPending ? (
              <div className={styles.statusMessage}>
                <p
                  className={
                    isApproved ? styles.approvedStatus : styles.rejectedStatus
                  }
                >
                  {isApproved
                    ? "✓ Essa solicitação já foi aprovada"
                    : "✕ Essa solicitação já foi recusada"}
                </p>
                {collaborationRequest?.feedback && (
                  <div className={styles.feedbackResponse}>
                    <p className={styles.messageLabel}>Seu feedback:</p>
                    <p className={styles.messageContent}>
                      {collaborationRequest.feedback}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className={styles.textareaWrapper}>
                  <p className={styles.messageLabel}>Seu feedback:</p>
                  <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Escreva seu feedback sobre a solicitação..."
                    rows={5}
                    disabled={approveCollaborationMutation.isPending}
                    maxLength={MAX_FEEDBACK_LENGTH}
                    className={showError ? styles.textareaError : ""}
                  />
                  <div className={styles.feedbackInfo}>
                    <span
                      className={`${styles.charCounter} ${
                        !isFeedbackValid ? styles.charCounterError : ""
                      }`}
                    >
                      {feedbackLength} / {MAX_FEEDBACK_LENGTH} caracteres
                      {charactersRemaining > 0 && ` (mínimo ${MIN_FEEDBACK_LENGTH})`}
                    </span>
                  </div>
                  {showError && (
                    <span className={styles.errorMessage}>
                      O feedback deve ter entre {MIN_FEEDBACK_LENGTH} e {MAX_FEEDBACK_LENGTH} caracteres
                    </span>
                  )}
                </div>
              </>
            )}

            <div className={styles.modalActions}>
              {isPending ? (
                <>
                  <button
                    onClick={handleClose}
                    className={styles.cancelButton}
                    disabled={approveCollaborationMutation.isPending}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleAction("Rejected")}
                    disabled={
                      approveCollaborationMutation.isPending ||
                      !isFeedbackValid ||
                      pendingAction === "Rejected"
                    }
                    className={styles.rejectButton}
                  >
                    {pendingAction === "Rejected" ? "Recusando..." : "Recusar"}
                  </button>
                  <button
                    onClick={() => handleAction("Approved")}
                    disabled={
                      approveCollaborationMutation.isPending ||
                      !isFeedbackValid ||
                      pendingAction === "Approved"
                    }
                    className={styles.approveButton}
                  >
                    {pendingAction === "Approved" ? "Aprovando..." : "Aprovar"}
                  </button>
                </>
              ) : (
                <button onClick={handleClose} className={styles.closeButton}>
                  Fechar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
