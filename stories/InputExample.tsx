import { Input } from "@components/Input";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";

interface InputExampleProps {
  label: string;
  icon: "envelope" | "lock" | "user";
  type: "password" | "email" | "text";
}

export function InputExample({ label, icon, type }: InputExampleProps) {
  return (
    <Input.Root>
      <Text size="xs">
        {label}
      </Text>
      <Input.Field>
        <Icon icon={icon} />
        <Input.Input type={type} />
      </Input.Field>
    </Input.Root>
  );
}