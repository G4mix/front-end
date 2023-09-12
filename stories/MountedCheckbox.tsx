import { Checkbox } from "@components/Checkbox";
import { Icon } from "@components/Icon";

export function MountedCheckbox({ checked, disabled }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Checkbox.Root disabled={disabled}>
      <Checkbox.Input checked={checked} />
      <Checkbox.IndicatorContainer>
        <Checkbox.Indicator>
          <Icon icon="check" height={16} />
        </Checkbox.Indicator>
      </Checkbox.IndicatorContainer>
    </Checkbox.Root>
  );
}