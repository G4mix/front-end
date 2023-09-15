import type { Meta, StoryObj } from "@storybook/react";

import { InputExample } from "./InputExample";

const meta = {
  title: "components/Input",
  component: InputExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InputExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordInput: Story = {
  args: {},
};