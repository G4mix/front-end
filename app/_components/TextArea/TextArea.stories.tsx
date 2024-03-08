import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "@components/TextArea";
import React from "react";

const meta = {
  title: "components/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  render: () => {
    return (
      <div style={{backgroundColor: "#FFFFF"}}>
        <TextArea />
      </div>
    );
  },
  tags: ["autodocs"]
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaDefault: Story = {

};

export const TextAreaWithResize: Story = {
  args: {
    autoResize: true
  }
};