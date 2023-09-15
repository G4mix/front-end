import type { Meta, StoryObj } from "@storybook/react";

import { CollapsableExample } from "./CollapsableExample";

const meta = {
  title: "components/Collapsable",
  component: CollapsableExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: {
        type: "boolean",
      },
    }
  },
} satisfies Meta<typeof CollapsableExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommonCollapsable: Story = {
  args: {
    open: true
  },
};