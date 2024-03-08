import type { Meta, StoryObj } from "@storybook/react";

import { PostLoading } from "@/app/(routes)/(feed)/_components/Post/PostLoading";

const meta = {
  title: "components/Post/Post",
  component: PostLoading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof PostLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostLoadingStory: Story = {
};