export type CreatePostInput = {
  title?: string;
  content?: string;
  images?: File[];
  links?: string[];
  tags?: string[];
};

export type UpdatePostInput = { id: number; } & CreatePostInput;