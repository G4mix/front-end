import { CommentType } from "@classes/APIManager/base/types/Models.types";

export const exampleAuthors: CommentType["author"][] = [
  {
    id: 1,
    displayName: "Le'Afonso",
    user: {
      id: 1,
      username: "Afonso",
      email: "afonso@gmail.com",
      icon: "https://img.freepik.com/free-vector/cute-cat-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4148.jpg"
    }
  },
  {
    id: 2,
    displayName: undefined,
    user: {
      id: 2,
      username: "rapaiz",
      email: "rapaz@gmail.com"
    }
  },
  {
    id: 3,
    displayName: "Le'teste",
    user: {
      id: 1,
      username: "teste",
      email: "teste@gmail.com"
    }
  }
];