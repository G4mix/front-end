import { Meta, StoryObj } from "@storybook/react";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@components/Icon";

const allIcons = {
  ...SolidIcons,
  ...BrandIcons
}

const meta = {
  title: "components/Icon/FontAwesome",
  component: Icon.FontAwesome,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["2xs", "xs", "sm", "lg", "xl", "2xl"], 
    }
  },
} satisfies Meta<typeof Icon.FontAwesome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GoogleIcon: Story = {
  args: {
    icon: allIcons["faGoogle"],
    size: "2xl"
  }
}

export const GithubIcon: Story = {
  args: {
    icon: allIcons["faGithub"],
    size: "2xl"
  }
}

export const LinkedinIcon: Story = {
  args: {
    icon: allIcons["faLinkedin"],
    size: "2xl"
  }
}