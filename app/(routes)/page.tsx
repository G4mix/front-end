import { PostFilter } from "@components/PostFilter";
import { Filter } from "@components/Filter";
import { Navbar } from "@components/Navbar";
import { Post } from "@components/Post";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
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
        <Filter
          options={{
            posts: "Postagens",
            projects: "Projetos",
            teams: "Equipes"
          }}
        />
      </div>
      <Post 
        postSession={{
          username: "JohnDoe",
          date: "11 Out 23",
          icon: null,
          like: "100",
          comment: "0",
          views: "30",
        }}
        postContent={{
          title: "Good Morning!",
          text: "Today I woke up and had a nice breakfast.",
          image: null,
          video: null,
        }}
      />
      <Navbar />
    </main>
  );
}
