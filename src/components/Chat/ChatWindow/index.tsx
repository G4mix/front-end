"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import styles from "./styles.module.css";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const [message, setMessage] = useState("");

  // Mock messages
  const messages = [
    {
      id: "1",
      senderId: "other",
      content: "Olá! Como vai?",
      timestamp: "10:30",
    },
    {
      id: "2",
      senderId: "me",
      content: "Oi! Tudo bem e você?",
      timestamp: "10:31",
    },
    {
      id: "3",
      senderId: "other",
      content: "Tudo ótimo! Vi sua ideia no feed, muito legal!",
      timestamp: "10:32",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implementar envio de mensagem
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.senderId === "me" ? styles.myMessage : styles.otherMessage
            }`}
          >
            {msg.senderId !== "me" && (
              <FaUserCircle className={styles.avatar} />
            )}
            <div className={styles.messageContent}>
              <p>{msg.content}</p>
              <span className={styles.timestamp}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <form className={styles.inputContainer} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.sendBtn}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

