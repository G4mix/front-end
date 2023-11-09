import { Navbar } from "@components/Navbar";
import { Post } from "@components/Post";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Post 
        PostSession={{
          username: "JohnDoe",
          date: "11 Out 23",
          icon: null,
          like: "100",
          comment: "0",
          chart: "30",
        }}
        PostContent={{
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
