import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "@components/Toast";

const meta = {
  title: "components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const USERNAME_INVALID_FORMATError: Story = {
};