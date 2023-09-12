import type { Meta, StoryObj } from "@storybook/react";

import { MountedCheckbox } from "./MountedCheckbox";

const meta = {
  title: "components/Checkbox",
  component: MountedCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" }
  }
} satisfies Meta<typeof MountedCheckbox>;

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