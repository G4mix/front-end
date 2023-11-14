import type { Meta, StoryObj } from "@storybook/react";

import { Collapsable } from "@/app/(routes)/auth/signup/_components/Collapsable";

const meta = {
  title: "components/Collapsable",
  component: Collapsable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof Collapsable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommonCollapsable: Story = {
  args: {
    open: true,
    items: [
      {
        icon: "x",
        text: "Um caractere maiúsculo",
      },
      {
        icon: "check",
        text: "Um número",
      },
      {
        icon: "x",
        text: "Um caractere especial",
      },
      {
        icon: "x",
        text: "No mínimo 8 caracteres",
      },
    ],
  },
};
