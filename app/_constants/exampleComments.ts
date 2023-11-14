import { CommentType } from "@classes/APIManager/types/Models.types";

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it...";
const currentDate = new Date();
const twoDaysAgo = new Date(currentDate);
twoDaysAgo.setDate(currentDate.getDate() - 2);
const oneDayAgo = new Date(currentDate);
oneDayAgo.setDate(currentDate.getDate() - 1);

export const exampleComments: CommentType[] = [
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
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo,
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
      {
        id: 7,
        likes: 11000,
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
    likes: 1000000,
    createdAt: oneDayAgo,
    updatedAt: undefined,
    content: lorem
  },
  {
    id: 8,
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
        id: 9,
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
        id: 10,
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
      {
        id: 11,
        likes: 11000,
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
    likes: 9000,
    createdAt: new Date(),
    updatedAt: undefined,
    content: lorem
  }
];