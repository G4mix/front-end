import type { Meta, StoryObj } from "@storybook/react";

import { Toast, ToastHandlers } from "@components/Toast";
import { Button } from "@components/Button";
import React from "react";

const meta = {
  title: "components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  render: () => {
    const toastRef = React.useRef<ToastHandlers>(null);

    return (
      <>
        <Toast ref={toastRef} />
        <Button onClick={() => toastRef.current?.showMessage("Formato de senha inválido!")}>
          Clique aqui
        </Button>
      </>
    );
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const USERNAME_INVALID_FORMATError: Story = {

};