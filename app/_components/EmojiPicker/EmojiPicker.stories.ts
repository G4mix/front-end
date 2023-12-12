import type { Meta, StoryObj } from "@storybook/react";

import { EmojiPicker } from "@components/EmojiPicker";

const meta = {
  title: "components/EmojiPicker",
  component: EmojiPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof EmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmojiPickerStory: Story = {

};