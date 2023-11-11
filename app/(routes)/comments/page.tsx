import { Comments } from "./_components/Comments";
import { Heading } from "@components/Heading";
import { Filter } from "@components/Filter";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";
import { exampleComments } from "@constants/exampleComments";


export default function CommentsPage() {
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
        <Comments comments={exampleComments} />
      </div>
    </main>
  );
}
