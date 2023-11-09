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

function buildIconStory(name: keyof typeof icons): Story {
  return ({
    args: {
      icon: name,
      size: "2xl"
    }
  });
}

export const ChartIcon: Story = buildIconStory("chart");
export const CheckIcon: Story = buildIconStory("check");
export const CommentIcon: Story = buildIconStory("comment");
export const EllipsisHIcon: Story = buildIconStory("ellipsis-h");
export const EnvelopeIcon: Story = buildIconStory("envelope");
export const GithubIcon: Story = buildIconStory("github");
export const GoogleIcon: Story = buildIconStory("google");
export const HouseIcon: Story = buildIconStory("house");
export const LikeIcon: Story = buildIconStory("like");
export const LinkedinIcon: Story = buildIconStory("linkedin");
export const LockIcon: Story = buildIconStory("lock");
export const LogoutIcon: Story = buildIconStory("logout");
export const MinusIcon: Story = buildIconStory("minus");
export const PlusIcon: Story = buildIconStory("plus");
export const SadIcon: Story = buildIconStory("sad");
export const SearchIcon: Story = buildIconStory("search");
export const ShareIcon: Story = buildIconStory("share");
export const UserIcon: Story = buildIconStory("user");
export const UserCircleIcon: Story = buildIconStory("user-circle");
export const UsersIcon: Story = buildIconStory("users");
export const XIcon: Story = buildIconStory("x");