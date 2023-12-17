import { CreatePostProvider } from "@contexts/create/CreatePostContext";
import { notFound, redirect } from "next/navigation";
import { PostQueryManager } from "@classes/APIManager/posts/PostQueryManager";
import { UserQueryManager } from "@classes/APIManager/user/UserQueryManager";
import { CreateHeader } from "@/app/(routes)/posts/create/_components/CreateHeader";
import { OptionsDiv } from "@components/OptionsDiv";
import { CreatePost } from "@/app/(routes)/posts/create/_components/CreatePost";
import { Navbar } from "@components/Navbar";
import styles from "@/app/(routes)/posts/create/page.module.css";
import React from "react";
import Link from "next/link";

export default async function PostUpdatePage({ params }: { params: { id: string } }) {
  const user = await UserQueryManager.findUserByToken({ useServer: true });
  if (!user || user.error) {
    redirect("/");
  }

  const post = await PostQueryManager.findPostById(parseInt(params.id), { useServer: true });
  if (!post || post.error) {
    notFound();
  }

  if (post.author!.user!.id! !== user.id) {
    redirect("/");
  }

  return (
    <CreatePostProvider defaultPost={post}>
      <main className={styles.main}>
        <Navbar withoutMobile />
        <div className={styles.createPost}>
          <Link href="/" aria-label="Voltar para o feed">
            <div className={styles.closeCreate}></div>
          </Link>
          <CreateHeader mode="update" />
          <CreatePost defaultContent={post.content} defaultTitle={post.title} />
        </div>
        <OptionsDiv isShowingOption={false}>{null}</OptionsDiv>
      </main>
    </CreatePostProvider>
  );
}