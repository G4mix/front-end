import { CheckboxIndicatorContainer } from "./CheckboxIndicatorContainer";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxRoot } from "./CheckboxRoot";

import { Icon } from "@components/Icon";

export function Checkbox({
  checked,
  disabled,
  defaultChecked,
  onChange
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <CheckboxRoot disabled={disabled}>
      <CheckboxInput checked={checked} onChange={onChange} defaultChecked={defaultChecked} />
      <CheckboxIndicatorContainer>
        <CheckboxIndicator>
          <Icon icon="check" height={16} />
        </CheckboxIndicator>
      </CheckboxIndicatorContainer>
    </CheckboxRoot>
  );
}
