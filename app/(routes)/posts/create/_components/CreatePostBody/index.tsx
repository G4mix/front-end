import { TextArea } from "@components/TextArea";
import { Icon } from "@components/Icon";
import styles from "./CreatePostBody.module.css";
import Image from "next/image";
import React from "react";

export const CreatePostBody = () => {
  return (
    <div className={styles.postBody}>
      <div className={styles.postContent}>
        <TextArea
          rows={1} className={styles.postContentArea}
          name="post_content" placeholder="Conteúdo da postagem"
          maxLength={700} autoResize
        />
        <Image
          src="https://sm.ign.com/t/ign_br/screenshot/default/tga-2021_gxpb.960.jpg"
          alt="Imagem do tga" width={294} height={156} className={styles.postContentImage}
        />
      </div>
      <div className={styles.postCommands}>
        <Icon icon="image" className={styles.postCommandIcon} />
        <Icon icon="pen-to-square" className={styles.postCommandIcon} disabled />
        <Icon icon="chart" className={styles.postCommandIcon} disabled />
        <Icon icon="link" className={styles.postCommandIcon} />
        <Icon icon="code" className={styles.postCommandIcon} disabled />
      </div>
    </div>
  );
};