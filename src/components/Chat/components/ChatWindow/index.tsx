"use client";

import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";
import styles from "./styles.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatById } from "@/api/queries/chat";
import { sendMessage } from "@/api/mutations/chat";
import { QUERY_KEYS } from "@/api/keys";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { UserIcon } from "@/components/Users";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/utils/toast";
import { CollaborationResponseModal } from "@/components/CollaborationResponseModal";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat with polling every 5 seconds
  const { data: chat, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHATS, chatId],
    queryFn: () => getChatById(chatId),
    refetchInterval: 5000, // Poll every 5 seconds
    enabled: !!chatId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CHATS, chatId],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CHATS] });
      setMessage("");
    },
    onError: () => {
      toast.error("Erro ao enviar mensagem");
    },
  });

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate({
        chatId,
        content: message.trim(),
      });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.chatWindow}>
        <div className={styles.loadingContainer}>
          <SpinnerLoading isPrimary />
        </div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className={styles.chatWindow}>
        <div className={styles.errorContainer}>
          <p>Chat não encontrado</p>
        </div>
      </div>
    );
  }

  const messages = chat.messages || [];

  // Check if this chat is related to a collaboration request and if current user is the owner
  const hasCollaborationRequest =
    chat.collaborationRequestId && chat.ownerId === userProfile?.id;

  const handleOpenCollaborationModal = () => {
    setShowCollaborationModal(true);
  };

  const handleCloseCollaborationModal = () => {
    setShowCollaborationModal(false);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <UserIcon
            displayName={chat.title}
            icon={chat.image}
            size={40}
            fontSize="1rem"
          />
          <span className={styles.headerName}>{chat.title}</span>
        </div>

        {hasCollaborationRequest && (
          <button
            className={styles.collaborationButton}
            onClick={handleOpenCollaborationModal}
            title="Responder solicitação de colaboração"
          >
            <FaReply size={16} />
            Responder Solicitação
          </button>
        )}
      </div>

      <div className={styles.messages}>
        {messages.length === 0 ? (
          <div className={styles.emptyMessages}>
            <p>Nenhuma mensagem ainda</p>
            <span>Envie a primeira mensagem!</span>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMyMessage = msg.senderId === userProfile?.id;

            return (
              <div
                key={index}
                className={`${styles.message} ${
                  isMyMessage ? styles.myMessage : styles.otherMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <p>{msg.content}</p>
                  <span className={styles.timestamp}>
                    {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.inputContainer} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.input}
          disabled={sendMessageMutation.isPending}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!message.trim() || sendMessageMutation.isPending}
        >
          <FaPaperPlane />
        </button>
      </form>

      {hasCollaborationRequest && chat.collaborationRequestId && (
        <CollaborationResponseModal
          isOpen={showCollaborationModal}
          onClose={handleCloseCollaborationModal}
          collaborationRequestId={chat.collaborationRequestId}
        />
      )}
    </div>
  );
};
