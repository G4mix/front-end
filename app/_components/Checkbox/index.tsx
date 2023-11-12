import { CheckboxIndicatorContainer } from "./CheckboxIndicatorContainer";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxRoot } from "./CheckboxRoot";

import { Icon } from "@components/Icon";
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  default?: boolean;
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export const Checkbox = ({disabled=false, defaultChecked=false, onChange }: CheckboxProps) => {
  return (
    <CheckboxRoot disabled={disabled}>
      <CheckboxInput onChange={onChange} defaultChecked={defaultChecked} />
      <CheckboxIndicatorContainer>
        <CheckboxIndicator>
          <Icon icon="check" height={16} />
        </CheckboxIndicator>
      </CheckboxIndicatorContainer>
    </CheckboxRoot>
  );
};
