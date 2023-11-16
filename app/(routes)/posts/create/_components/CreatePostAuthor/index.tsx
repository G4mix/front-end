import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { Text } from "@components/Text";
import styles from "./CreatePostAuthor.module.css";
import React from "react";

export const CreatePostAuthor = () => {
  return (
    <div className={styles.postAuthor}>
      <DuotoneUserIcon.Root className={styles.duotoneRoot}>
        <DuotoneUserIcon.Circle className={styles.duotoneCircle} />
        <DuotoneUserIcon.UserCircle className={styles.duotoneUserCircle} />
      </DuotoneUserIcon.Root>
      <Text size="xs">Lorem ipsum</Text>
    </div>
  );
};