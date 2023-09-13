import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";


export default function Home() {
  const session = {
    name: "ViniJr",
    email: "vinijr@gmail.com",
    icon: "https://th.bing.com/th/id/R.ebe490b43acc0477007c265bb0abcbd8?rik=FfHibOoKryhtzA&pid=ImgRaw&r=0"
  };
  
  return (
    <main className={styles.main}>
      <Navbar user={session} />
    </main>
  );
}
