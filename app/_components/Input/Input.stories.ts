import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@components/Input";

const meta = {
  title: "components/Input",
  component: Input,
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
    placeholder: {
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UsernameInput: Story = {
  args: {
    placeholder: "Digite um nome de usuário válido",
    label: "Username",
    type: "text",
    icon: "user",
    name: "username",
  },
};

export const EmailInput: Story = {
  args: {
    placeholder: "Digite o seu e-mail",
    label: "E-mail",
    type: "email",
    icon: "envelope",
    name: "email",
  },
};

export const PasswordInput: Story = {
  args: {
    placeholder: "Digite uma senha",
    label: "Senha",
    type: "password",
    icon: "lock",
    name: "password",
  },
};

export const InputWithoutIcon: Story = {
  args: {
    placeholder: "Digite seu nome de usuário",
    label: "Username",
    type: "text",
    name: "username",
  },
};

export const InputWithoutLabel: Story = {
  args: {
    placeholder: "Digite seu nome de usuário",
    type: "text",
    icon: "user",
    name: "username",
  },
};

export const InputWithoutLabelAndIcon: Story = {
  args: {
    placeholder: "Digite seu nome de usuário",
    type: "text",
    name: "username",
  },
};
