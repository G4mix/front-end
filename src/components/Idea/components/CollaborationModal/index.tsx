"use client";

import { useState } from "react";
import styles from "../../styles.module.css";
import { toast } from "@/utils/toast";
import { ICreateCollaborationRequest } from "@/interfaces/collaboration";
import { useMutation } from "@tanstack/react-query";
import { createCollaborationRequest } from "@/api/mutations/collaboration";

export const CollaborationModal = ({
  isOpen,
  onClose,
  ideaId,
}: {
  isOpen: boolean;
  onClose: () => void;
  ideaId: string;
}) => {
  const [collaborationMessage, setCollaborationMessage] = useState("");

  const {
    mutate: createCollaborationRequestMutation,
    isPending: isLoadingCollaboration,
  } = useMutation({
    mutationFn: (body: ICreateCollaborationRequest) =>
      createCollaborationRequest(body),
    onSuccess: () => {
      toast.success("Solicitação de colaboração enviada!");
      onClose();
      setCollaborationMessage("");
    },
    onError: (error) => {
      toast.error("Erro ao enviar solicitação");
      console.error("Erro ao solicitar colaboração:", error);
    },
  });

  const handleSendCollaboration = async () => {
    if (!collaborationMessage.trim()) {
      toast.error("Por favor, escreva uma mensagem");
      return;
    }

    createCollaborationRequestMutation({
      ideaId: ideaId,
      message: collaborationMessage,
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Solicitar Colaboração</h3>
        <p>Conte ao autor por que você quer colaborar nesta ideia:</p>
        <textarea
          value={collaborationMessage}
          onChange={(e) => setCollaborationMessage(e.target.value)}
          placeholder="Ex: Tenho experiência em backend e adoraria ajudar..."
          rows={5}
        />
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button
            onClick={handleSendCollaboration}
            disabled={isLoadingCollaboration}
            className={styles.sendButton}
          >
            {isLoadingCollaboration ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </div>
      </div>
    </div>
  );
};
