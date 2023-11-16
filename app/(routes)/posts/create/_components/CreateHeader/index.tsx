import { Heading } from "@components/Heading";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import styles from "./CreateHeader.module.css";
import React from "react";

export const CreateHeader = () => {
  return (
    <div className={styles.createHeader}>
      <Heading weight="bold">Nova postagem</Heading>
      <Button className={styles.postButton} type="submit">
        <Text weight="medium">Publicar</Text>
      </Button>
    </div>
  );
};