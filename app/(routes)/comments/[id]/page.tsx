import { exampleComments } from "@constants/exampleComments";
import { FilterComments } from "./_components/FilterComments";
import { Comments } from "./_components/Comments";
import { Heading } from "@components/Heading";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

function findCommentsByPostId(id: number) {
  console.log(id);
  return exampleComments;
}

export default function CommentsPage({
  params: { id },
}: { params: { id: string } }) {
  const comments = findCommentsByPostId(parseInt(id));

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
        <Comments comments={comments} />
      </div>
    </main>
  );
}
