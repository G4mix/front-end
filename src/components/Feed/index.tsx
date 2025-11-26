"use client";

import { useEffect, useState } from "react";
import { Idea } from "../Idea";
import { FeedHeader } from "./components";
import styles from "./styles.module.css";
import { getIdeas } from "@/api/queries/idea";
import { IIdea } from "@/interfaces/idea";

export const Feed = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);

  const getAllIdeas = async () => {
    const data = await getIdeas({
      page: 0,
      quantity: 8,
    });

    setIdeas(data.data);
  };

  useEffect(() => {
    getAllIdeas();
  }, []);

  return (
    <main className={styles.feedContainer}>
      <FeedHeader />

      <div className="w100">
        {ideas.map((idea) => (
          <Idea key={idea.id} idea={idea} />
        ))}
      </div>
    </main>
  );
};
