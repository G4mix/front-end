import { Heading } from "@components/Heading";
import { Comment } from "@components/Comment";
import { Navbar } from "@components/Navbar";
import { Icon } from "@components/Icon";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

export default function Comments() {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.comments}>
        <Link href="/">
          <div className={styles.closeComments} />
        </Link>
        <div className={styles.filtersDiv}>
          <Heading size="default">
            Comentários
          </Heading>
          <div className={styles.filter}>
            <Icon icon="chart" size="1x" style={{opacity: "1"}} />
          </div>
        </div>
        <Comment
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it..."
        />
      </div>
    </main>
  );
}
