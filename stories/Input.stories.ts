import type { Meta, StoryObj } from "@storybook/react";

import { InputExample } from "./InputExample";

const meta = {
  title: "components/Input",
  component: InputExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    type: {
      control: {
        type: "select",
      },
      options: ["password", "email", "text"], 
    },
    icon: {
      control: {
        type: "select",
      },
      options: ["envelope", "lock", "user"], 
    },
  },
} satisfies Meta<typeof InputExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UsernameInput: Story = {
  args: {
    label: "Username",
    type: "text",
    icon: "user"
  },
};

export const EmailInput: Story = {
  args: {
    label: "E-mail",
    type: "email",
    icon: "envelope"
  },
};

export const PasswordInput: Story = {
  args: {
    label: "Senha",
    type: "password",
    icon: "lock"
  },
};