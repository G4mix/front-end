import type { Meta, StoryObj } from "@storybook/react";

import { ErrorsToast } from "@components/ErrorsToast";

const meta = {
  title: "components/ErrorsToast",
  component: ErrorsToast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ErrorsToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const USERNAME_INVALID_FORMATError: Story = {
};