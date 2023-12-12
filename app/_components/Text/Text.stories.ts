import { Meta, StoryObj } from "@storybook/react";
import { Text } from "@components/Text";

const meta = {
  title: "components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "default", "md", "lg"], 
    },
    weight: {
      control: {
        type: "select"
      },
      options: ["thin", "light", "regular", "medium", "bold", "black"]
    }
  }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: {
    children: "Extra Small Text",
    weight: "regular",
    size: "xs"
  }
};

export const Small: Story = {
  args: {
    children: "Small Text",
    weight: "regular",
    size: "sm"
  }
};

export const Default: Story = {
  args: {
    children: "Default Text",
    weight: "regular",
    size: "default"
  }
};

export const Medium: Story = {
  args: {
    children: "Medium Text",
    weight: "regular",
    size: "md"
  }
};

export const Large: Story = {
  args: {
    children: "Large Text",
    weight: "regular",
    size: "lg"
  }
};