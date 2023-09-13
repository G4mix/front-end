import { Meta, StoryObj } from "@storybook/react";
import { icons } from "@constants/icons";
import { Icon } from "@components/Icon";

const meta = {
  title: "components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons), 
    },
    size: {
      control: {
        type: "select",
      },
      options: ["2xs", "xs", "sm", "lg", "xl", "2xl"], 
    },
    disabled: { control: "boolean" }
  }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GoogleIcon: Story = {
  args: {
    icon: "google",
    size: "2xl"
  }
}

export const GithubIcon: Story = {
  args: {
    icon: "github",
    size: "2xl"
  }
}

export const LinkedinIcon: Story = {
  args: {
    icon: "linkedin",
    size: "2xl"
  }
}

export const LockIcon: Story = {
  args: {
    icon: "lock",
    size: "2xl"
  }
}

export const UserIcon: Story = {
  args: {
    icon: "user",
    size: "2xl"
  }
}

export const CheckIcon: Story = {
  args: {
    icon: "check",
    size: "2xl"
  }
}

export const UsersIcon: Story = {
  args: {
    icon: "users",
    size: "2xl"
  }
}

export const PlusIcon: Story = {
  args: {
    icon: "plus",
    size: "2xl"
  }
}

export const HouseIcon: Story = {
  args: {
    icon: "house",
    size: "2xl"
  }
}

export const SearchIcon: Story = {
  args: {
    icon: "search",
    size: "2xl"
  }
}