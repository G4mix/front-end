import { exampleAuthors } from "./exampleAuthors";
import { PostType } from "@classes/APIManager/base/types/Models.types";

export const examplePosts = (): PostType[] => {
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
      commentsCount: 50000,
      viewsCount: 1000000,
      likesCount: 3000,
      title: "Lorem lorem ipsum!",
      createdAt: twoDaysAgo.toString(),
      updatedAt: twoDaysAgo.toString(),
      content: lorem
    },
    {
      id: 2,
      author: exampleAuthors[1],
      commentsCount: 50000,
      viewsCount: 1000000,
      likesCount: 1000000,
      title: "Lorem lorem ipsum!",
      createdAt: oneDayAgo.toString(),
      updatedAt: undefined,
      content: lorem
    },
    {
      id: 3,
      author: exampleAuthors[0],
      commentsCount: 50000,
      viewsCount: 1000000,
      likesCount: 9000,
      title: "Lorem lorem ipsum!",
      createdAt: currentDate.toString(),
      updatedAt: undefined,
      content: lorem
    }
  ];
};