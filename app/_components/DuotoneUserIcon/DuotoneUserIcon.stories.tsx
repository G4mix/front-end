import type { Meta, StoryObj } from "@storybook/react";
import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import React from "react";

const MountedDuotoneUserIcon = () => {
  return (
    <DuotoneUserIcon.Root>
      <DuotoneUserIcon.Circle />
      <DuotoneUserIcon.UserCircle />
    </DuotoneUserIcon.Root>
  );
};

const meta = {
  title: "components/Icon/DuotoneUserIcon",
  component: MountedDuotoneUserIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof MountedDuotoneUserIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DuotoneUserIconStory: Story = {};