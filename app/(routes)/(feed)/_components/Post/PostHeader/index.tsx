import type { PostType } from "@/app/_classes/APIManager/base/types/Models.types";
import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { MoreOptions } from "./MoreOptions";
import { formatDate } from "@functions/formatDate";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import styles from "./PostHeader.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type PostHeaderProps = {
  handleDeletePost?: () => void;
} & Pick<PostType, "id" | "createdAt" | "updatedAt" | "author">;

export const PostHeader = ({ id, author, createdAt, updatedAt, handleDeletePost }: PostHeaderProps) => {
  return(
    <div className={styles.postHeader}>
      <Link
        href={`/users/${author!.user!.username}`}
        aria-label={`Perfil do usuário ${author!.displayName || author!.user!.username}`}
        className={styles.postUser}
      >
        {
          author!.user!.icon ? (
            <Image
              src={author!.user!.icon}
              alt={`Imagem do usuário ${author!.displayName || author!.user!.username}`}
              className={styles.userIcon}
              width={24}
              height={24}
            />
          ) : (
            <DuotoneUserIcon.Root>
              <DuotoneUserIcon.Circle />
              <DuotoneUserIcon.UserCircle />
            </DuotoneUserIcon.Root>
          )
        }
        <Heading size="sm" asChild>
          <h5>{author!.displayName || author!.user!.username}</h5>
        </Heading>
        <Text size="xs" weight="thin">· {updatedAt ? `Atualizado ${formatDate(new Date(updatedAt!))}` : formatDate(new Date(createdAt!))}</Text>
      </Link>
      <MoreOptions id={id} author={author} handleDeletePost={handleDeletePost} />
    </div>
  );
};