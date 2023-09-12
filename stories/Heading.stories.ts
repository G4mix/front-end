import { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@components/Heading";

const meta = {
  title: "components/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "default", "md", "lg"], 
    }
  }
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: {
    children: "Extra Small Heading",
    size: "xs"
  }
}

export const Small: Story = {
  args: {
    children: "Small Heading",
    size: "sm"
  }
}

export const Default: Story = {
  args: {
    children: "Default Heading",
    size: "default"
  }
}

export const Medium: Story = {
  args: {
    children: "Medium Heading",
    size: "md"
  }
}

export const Large: Story = {
  args: {
    children: "Large Heading",
    size: "lg"
  }
}