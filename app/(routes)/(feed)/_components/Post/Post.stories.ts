import type { Meta, StoryObj } from "@storybook/react";

import { Post } from "@/app/(routes)/(feed)/_components/Post";

const meta = {
  title: "components/Post/Post",
  component: Post,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostStory: Story = {
  args: {
    post: {
      author: {
        displayName: "user_teste",
        user: {
          id: 1,
          username: "user_teste"
        },
        icon: "/android-chrome-512x512.png",
        id: 1
      },
      commentsCount: 200000,
      likesCount: 350000,
      title: "Post de exemplo",
      updatedAt: new Date().toString(),
      createdAt: new Date().toString(),
      isLiked: true,
      tags: [{ id: 1, name: "tag1" }],
      content: "Post",
      images: [{ src: "/android-chrome-512x512.png", name: "icon", height: 512, width: 512 }],
      links: [{ id: 1, link: "https://www.youtube.com" }],
      viewsCount: 3700000,
      id: 1
    }
  }
};