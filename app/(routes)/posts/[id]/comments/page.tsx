import { FilterComments } from "./_components/FilterComments";
import { Comments } from "./_components/Comments";
import { Heading } from "@components/Heading";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

export default async function CommentsPage({ params }: { params: { id: string } }) {
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
          <FilterComments />
        </div>
        <Comments postId={parseInt(params.id)} />
      </div>
    </main>
  );
}
