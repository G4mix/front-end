"use client";

import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { useSession } from "@contexts/global/SessionContext";
import { Text } from "@components/Text";
import styles from "./CreatePostAuthor.module.css";
import Image from "next/image";
import React from "react";

export const CreatePostAuthor = () => {
  const { session } = useSession();
  return (
    <div className={styles.postAuthor}>
      {
        session && session.icon ? (
          <Image
            width={100}
            height={100}
            src={session.icon}
            quality={100}
            className={styles.userIcon}
            alt={`Ícone do usuário: ${session.username}`}
          />
        ) : (
          <DuotoneUserIcon.Root className={styles.duotoneRoot}>
            <DuotoneUserIcon.Circle className={styles.duotoneCircle} />
            <DuotoneUserIcon.UserCircle className={styles.duotoneUserCircle} />
          </DuotoneUserIcon.Root>
        )
      }
      <Text size="xs" fixeSize>{session ? session.username : ""}</Text>
    </div>
  );
};