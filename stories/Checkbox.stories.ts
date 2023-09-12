import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@components/Checkbox";

const meta = {
  title: "components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" }
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true
  },
};

export const Unchecked: Story = {
  args: {
    checked: false
  }
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true
  }
};

export const UncheckedDisabled: Story = {
  args: {
    checked: false,
    disabled: true
  }
};