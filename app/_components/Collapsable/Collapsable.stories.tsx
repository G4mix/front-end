import type { Meta, StoryObj } from "@storybook/react";

import { Collapsable, CollapsableHandlers } from "@components/Collapsable";
import React, { useEffect } from "react";

const items = [
  {
    icon: "check",
    text: "Contém pelo menos um caractere maiúsculo",
  },
  {
    icon: "x",
    text: "Contém pelo menos um número",
  },
  {
    icon: "x",
    text: "Contem pelo menos um caractere especial",
  },
  {
    icon: "x",
    text: "Contém no mínimo 8 caracteres",
  },
];

const meta = {
  title: "components/Collapsable",
  component: Collapsable,
  parameters: {
    layout: "centered",
  },
  args: {
    items: items
  },
  render: () => {
    const collapsableRef = React.useRef<CollapsableHandlers>(null);

    useEffect(() => {
      collapsableRef.current?.collapse();
    }, []);

    return (
      <Collapsable
        ref={collapsableRef}
        items={items}
      />
    );
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Collapsable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CollapsableStory: Story = {
  args: {
    items: items
  }
};