import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../app/_components/Button";

const meta = {
  title: "components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button"
  },
};

export const Warning: Story = {
  args: {
    children: "Delete now",
    backgroundColor: "red",
  }
};