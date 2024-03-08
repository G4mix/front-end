import { Button } from "@components/Button";
import { Text } from "@components/Text";
import styles from "./CreateHeader.module.css";
import React from "react";

type CreateHeaderProps = {
  mode: "create" | "update";
};

export const CreateHeader = ({ mode }: CreateHeaderProps) => {
  return (
    <div className={styles.createHeader}>
      <Text weight="bold" asChild fixeSize>
        <h2>{ mode === "create" ? "Nova" : "Atualizar"} postagem</h2>
      </Text>
      <Button className={styles.postButton} type="submit">
        <Text weight="medium" fixeSize>{ mode === "create" ? "Publicar" : "Atualizar"}</Text>
      </Button>
    </div>
  );
};