import { PostOptionsProvider } from "@/app/_contexts/post/PostOptionsContext";
import { PostsProvider } from "@/app/_contexts/feed/PostsContext";
import { PostFilter } from "./_components/PostFilter";
import { Navbar } from "@components/Navbar";
import { Filter } from "@components/Filter";
import { Posts } from "./_components/Posts";
import styles from "./page.module.css";
import React from "react";

export default async function FeedPage() {
  return (
    <PostsProvider>
      <main className={styles.main}>
        <Navbar />

        <PostOptionsProvider>
          <div className={styles.postZone}>
            <div className={styles.header}>
              <PostFilter
                options={{
                  recent: {
                    name: "Recentes",
                    icon: "clock",
                  },
                  discover: {
                    name: "Descubra",
                    icon: "search",
                  },
                }}
              />
              <Filter
                disabled
                options={{
                  posts: "Postagens",
                  projects: "Projetos",
                  teams: "Equipes",
                }}
              />
            </div>

            <Posts />
          </div>
        </PostOptionsProvider>
      </main>
    </PostsProvider>
  );
}
