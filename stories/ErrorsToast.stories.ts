import type { Meta, StoryObj } from "@storybook/react";

import { ErrorsToast } from "@components/ErrorsToast";

const meta = {
  title: "components/ErrorsToast",
  component: ErrorsToast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: { control: "select" },
    open: { control: "boolean" }
  },
} satisfies Meta<typeof ErrorsToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const USERNAME_INVALID_FORMATError: Story = {
  args: {
    error: "USERNAME_INVALID_FORMAT",
    open: true,
    setOpen: () => console.log("fake setOpen")
  },
};