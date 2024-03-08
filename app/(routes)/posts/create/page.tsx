import { CreatePostProvider } from "@contexts/create/CreatePostContext";
import { CreateHeader } from "./_components/CreateHeader";
import { OptionsDiv } from "@components/OptionsDiv";
import { CreatePost } from "./_components/CreatePost";
import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

export default function CreatePage() {
  return (
    <CreatePostProvider>
      <main className={styles.main}>
        <Navbar withoutMobile />
        <div className={styles.createPost}>
          <Link href="/" aria-label="Voltar para o feed" className={styles.closeCreateLink}>
            <div className={styles.closeCreate}></div>
          </Link>
          <CreateHeader mode="create" />
          <CreatePost />
        </div>
        <OptionsDiv isShowingOption={false}>{null}</OptionsDiv>
      </main>
    </CreatePostProvider>
  );
}