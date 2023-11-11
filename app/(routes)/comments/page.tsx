import { Heading } from "@components/Heading";
import { Comment } from "@components/Comment";
import { Filter } from "@components/Filter";
import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

export default function Comments() {
  return (
    <main className={styles.main}>
      <div className={styles.commentsZone}>
        <Link href="/">
          <div className={styles.closeComments} />
        </Link>
        <div className={styles.filtersDiv}>
          <Heading size="default">
            Comentários
          </Heading>
          <Filter
            options={{
              recent: "Recentes",
              relevant: "Relevantes",
              all: "Todos"
            }}
          />
        </div>
        <div className={styles.comments}>
          <Comment
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it..."
            likes={300}
          />
          <Comment
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it..."
            likes={300}
            isReply
          />
        </div>
      </div>
    </main>
  );
}
