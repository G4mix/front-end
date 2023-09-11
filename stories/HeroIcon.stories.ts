import { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@components/Icon";

const meta = {
  title: "components/Icon/Hero",
  component: Icon.Hero,
  argTypes: {
    width: {
      control: {
        type: "number",
        min: 1,
        max: 500
      },
    },
    height: {
      control: {
        type: "number",
        min: 1,
        max: 500
      },
    }
  },
} satisfies Meta<typeof Icon.Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LockClosedIcon: Story = {
  args: {
    icon: "LockClosedIcon",
    width: 64,
    height: 64
  }
}

export const UserIcon: Story = {
  args: {
    icon: "UserIcon",
    width: 64,
    height: 64
  }
}

export const CheckIcon: Story = {
  args: {
    icon: "CheckIcon",
    width: 64,
    height: 64
  }
}