import { Heading } from "@components/Heading";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import styles from "./CreateHeader.module.css";
import React from "react";

type CreateHeaderProps = {
  mode?: "create" | "update";
};

export const CreateHeader = ({ mode }: CreateHeaderProps = { mode: "create" }) => {
  return (
    <div className={styles.createHeader}>
      <Heading weight="bold">{ mode === "create" ? "Nova" : "Atualizar"} postagem</Heading>
      <Button className={styles.postButton} type="submit">
        <Text weight="medium">{ mode === "create" ? "Publicar" : "Atualizar"}</Text>
      </Button>
    </div>
  );
};