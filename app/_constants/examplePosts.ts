import { exampleAuthors } from "./exampleAuthors";
import { PostType } from "@classes/APIManager/types/Models.types";

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
      comments: 50000,
      views: 1000000,
      likes: 3000,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
      content: lorem
    },
    {
      id: 2,
      author: exampleAuthors[1],
      comments: 50000,
      views: 1000000,
      likes: 1000000,
      createdAt: oneDayAgo,
      updatedAt: undefined,
      content: lorem
    },
    {
      id: 3,
      author: exampleAuthors[0],
      comments: 50000,
      views: 1000000,
      likes: 9000,
      createdAt: new Date(),
      updatedAt: undefined,
      content: lorem
    }
  ];
};