import { CheckboxIndicatorContainer } from "./CheckboxIndicatorContainer";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxRoot } from "./CheckboxRoot";

import { Icon } from "@components/Icon";
import React, { forwardRef } from "react";

type CheckboxProps = {
  disabled?: boolean;
  defaultChecked?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ disabled=false, defaultChecked=false, ...props }, ref) => {
  return (
    <CheckboxRoot disabled={disabled}>
      <CheckboxInput defaultChecked={defaultChecked} ref={ref} {...props} />
      <CheckboxIndicatorContainer>
        <CheckboxIndicator>
          <Icon icon="check" height={16} />
        </CheckboxIndicator>
      </CheckboxIndicatorContainer>
    </CheckboxRoot>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };