import { CommentType } from "@/app/_classes/APIManager/base/types/Models.types";
import { exampleAuthors } from "./exampleAuthors";

export const exampleComments = (): CommentType[] => {
  const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it...";
  const currentDate = new Date(2023, 10, 14, 21, 45);
  const twoDaysAgo = new Date(currentDate);
  twoDaysAgo.setDate(currentDate.getDate() - 2);
  const oneDayAgo = new Date(currentDate);
  oneDayAgo.setDate(currentDate.getDate() - 1);

  return [
    {
      id: 1,
      author: exampleAuthors[2],
      replies: [
        {
          id: 2,
          likes: 2500,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[1],
          content: lorem
        },
        {
          id: 3,
          likes: 1000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[0],
          content: lorem
        },
      ],
      likes: 3000,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
      content: lorem
    },
    {
      id: 4,
      author: exampleAuthors[1],
      replies: [
        {
          id: 5,
          likes: 1000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[0],
          content: lorem
        },
        {
          id: 6,
          likes: 1000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[0],
          content: lorem
        },
        {
          id: 7,
          likes: 11000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[2],
          content: lorem
        }
      ],
      likes: 1000000,
      createdAt: oneDayAgo,
      updatedAt: undefined,
      content: lorem
    },
    {
      id: 8,
      author: exampleAuthors[0],
      replies: [
        {
          id: 9,
          likes: 1000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[1],
          content: lorem
        },
        {
          id: 10,
          likes: 1000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[2],
          content: lorem
        },
        {
          id: 11,
          likes: 11000,
          createdAt: new Date(),
          updatedAt: undefined,
          author: exampleAuthors[2],
          content: lorem
        },
      ],
      likes: 9000,
      createdAt: new Date(),
      updatedAt: undefined,
      content: lorem
    }
  ];
};