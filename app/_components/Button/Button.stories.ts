import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@components/Button";

const meta = {
  title: "components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "I'm a Button"
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled button",
    disabled: true
  }
};