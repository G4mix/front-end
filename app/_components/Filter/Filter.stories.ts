import type { Meta, StoryObj } from "@storybook/react";

import { Filter } from "@components/Filter";

const meta = {
  title: "components/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterStory: Story = {
  args: {
    options: { "option1": "Opção 1", "option2": "Opção 2" },
  }
};