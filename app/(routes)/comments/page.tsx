import { CommentType } from "@/app/_classes/APIManager/types/Models.types";
import { Comments } from "./_components/Comments";
import { Heading } from "@components/Heading";
import { Filter } from "@components/Filter";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it...";

const exampleComments: CommentType[] = [
  {
    id: 1,
    author: {
      id: 1,
      displayName: "Le'Afonso",
      user: {
        id: 1,
        username: "Afonso",
        email: "afonso@gmail.com"
      }
    },
    replies: [
      {
        id: 2,
        likes: 2500,
        createdAt: new Date(),
        updatedAt: undefined,
        author: {
          id: 2,
          displayName: "Le'teste",
          user: {
            id: 2,
            username: "teste",
            email: "teste@gmail.com"
          }
        },
        content: lorem
      },
      {
        id: 3,
        likes: 1000,
        createdAt: new Date(),
        updatedAt: undefined,
        author: {
          id: 2,
          displayName: undefined,
          user: {
            id: 2,
            username: "rapaiz",
            email: "rapaz@gmail.com"
          }
        },
        content: lorem
      },
    ],
    likes: 3000,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: lorem
  },
  {
    id: 4,
    author: {
      id: 2,
      displayName: "Le'teste",
      user: {
        id: 1,
        username: "teste",
        email: "teste@gmail.com"
      }
    },
    replies: [
      {
        id: 5,
        likes: 1000,
        createdAt: new Date(),
        updatedAt: undefined,
        author: {
          id: 2,
          displayName: undefined,
          user: {
            id: 2,
            username: "rapaiz",
            email: "rapaz@gmail.com"
          }
        },
        content: lorem
      },
      {
        id: 6,
        likes: 1000,
        createdAt: new Date(),
        updatedAt: undefined,
        author: {
          id: 1,
          displayName: "Le'Afonso",
          user: {
            id: 1,
            username: "Afonso",
            email: "afonso@gmail.com"
          }
        },
        content: lorem
      },
    ],
    likes: 3000,
    createdAt: new Date(),
    updatedAt: undefined,
    content: lorem
  }
];

export default function CommentsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.commentsZone}>
        <Link href="/">
          <div className={styles.closeComments} />
        </Link>
        <div className={styles.filtersDiv}>
          <Heading size="default">
            Comentários
          </Heading>
          <Filter
            options={{
              recent: "Recentes",
              relevant: "Relevantes",
              all: "Todos"
            }}
          />
        </div>
        <Comments comments={exampleComments} />
      </div>
    </main>
  );
}
