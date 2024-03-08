import { Meta, StoryObj } from "@storybook/react";
import { OptionsDiv } from "@components/OptionsDiv";

const meta = {
  title: "components/OptionsDiv",
  component: OptionsDiv,
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof OptionsDiv>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OptionsDivShowingNothing: Story = {
  args: {
    isShowingOption: false,
    children: null
  }
};