import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "@components/Loader";
import React from "react";

const meta = {
  title: "components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  render: () => {
    return (
      <div style={{display: "flex"}}>
        <Loader />
      </div>
    );
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoaderStory: Story = {

};