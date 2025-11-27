"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { UserIcon } from "@/components/Users/UserIcon";
import Link from "next/link";
import { QUERY_KEYS } from "@/api/keys";
import { useQuery } from "@tanstack/react-query";
import { getIdeaById } from "@/api";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Comments } from "./Comments";
import { FaLink } from "react-icons/fa6";
import { useState } from "react";
import { CollaborationModal } from "../CollaborationModal";

export const IdeaScreen = ({ ideaId }: { ideaId: string }) => {
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  const { data: idea, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_IDEA_BY_ID, ideaId],
    queryFn: () => getIdeaById(ideaId),
    enabled: !!ideaId,
  });

  if (!idea && !isLoading) {
    return <div>Idea not found</div>;
  }

  if (isLoading) {
    return <SpinnerLoading isPrimary={true} />;
  }

  const { title, author, tags, images, content, links } = idea;
  const imageUrl = images[0] || "/card.png";

  const hasTags = tags.length > 0;
  const hasLinks = links.length > 0;

  return (
    <div className={styles.ideaScreen}>
      <div className={styles.imageContainer}>
        <Image src={imageUrl} alt={title} width={1112} height={626} />
      </div>

      <div className={styles.content}>
        <h1>{title}</h1>

        <div className={styles.owner}>
          <UserIcon
            displayName={author.displayName}
            icon={author.icon}
            size={24}
          />
          <span>
            Criado por{" "}
            <Link href={`/profile/${author.id}`}>@{author.displayName}</Link>
          </span>
        </div>

        {hasTags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className={styles.description}>
          <h3>Descrição</h3>
          <p>{content}</p>
        </div>

        {hasLinks && (
          <div className={styles.links}>
            {links.map((link) => (
              <Link key={link} href={link} className={styles.link}>
                <FaLink size={16} />
                {link}
              </Link>
            ))}
          </div>
        )}

        <button
          className={styles.collaborateBtn}
          onClick={() => setShowCollaborationModal(true)}
        >
          Quero colaborar
        </button>
      </div>

      <Comments ideaId={ideaId} />

      <CollaborationModal
        isOpen={showCollaborationModal}
        onClose={() => setShowCollaborationModal(false)}
        ideaId={ideaId}
      />
    </div>
  );
};
