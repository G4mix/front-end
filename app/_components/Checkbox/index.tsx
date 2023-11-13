import { CheckboxIndicatorContainer } from "./CheckboxIndicatorContainer";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxRoot } from "./CheckboxRoot";

import { Icon } from "@components/Icon";
import React, { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  default?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({disabled=false, defaultChecked=false }, ref) => {
  return (
    <CheckboxRoot disabled={disabled}>
      <CheckboxInput defaultChecked={defaultChecked} ref={ref} />
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