import type { Meta, StoryObj } from "@storybook/react";

import { PostFilter } from "@/app/(routes)/(feed)/_components/PostFilter";

const meta = {
  title: "components/Post/PostFilter",
  component: PostFilter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof PostFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostFilterStory: Story = {
  args: {
    options: {
      recent: {
        name: "Recentes",
        icon: "clock"
      },
      discover: {
        name: "Descubra",
        icon: "search"
      }
    }
  }
};