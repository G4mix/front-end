import { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "@components/Navbar";

const meta = {
  title: "components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavbarBottom: Story = {
  args: {
    position: "bottom"
  }
};

export const NavbarTop: Story = {
  args: {
    position: "top"
  }
};
