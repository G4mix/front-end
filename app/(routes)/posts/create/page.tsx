import { CreatePostProvider } from "@contexts/create/CreatePostContext";
import { CreateHeader } from "./_components/CreateHeader";
import { CreatePost } from "./_components/CreatePost";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

export default function CreatePage() {
  return (
    <CreatePostProvider>
      <main className={styles.main}>
        <Link href="/" aria-label="Voltar para o feed">
          <div className={styles.closeCreate}></div>
        </Link>
        <CreateHeader />
        <CreatePost />
      </main>
    </CreatePostProvider>
  );
}