import { PostFilter } from "./_components/PostFilter";
import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";
import { Posts } from "./_components/Posts";

export default function FeedPage() {
  return (
    <main className={styles.main}>
      <div className={styles.postZone}>
        <div className={styles.header}>
          <PostFilter
            options={{
              recent: {
                name: "Recentes",
                icon: "clock"
              },
              highlights: {
                name: "Destaques",
                icon: "bolt-lightning"
              },
              following: {
                name: "Seguindo",
                icon: "user-group"
              }
            }}
          />
          {/* <Filter
            options={{
              posts: "Postagens",
              projects: "Projetos",
              teams: "Equipes"
            }}
          /> */}
        </div>
        <Posts />
      </div>
      <Navbar /> 
    </main>
  );
}
