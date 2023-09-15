import { Input } from "@components/Input";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";

interface InputExampleProps {
  placeholder: string;
  label?: string;
  icon?: "envelope" | "lock" | "user";
  type: "password" | "email" | "text";
  name: "password" | "email" | "username";
}

export function InputExample({ label, icon, type, placeholder, name }: InputExampleProps) {
  return (
    <Input.Root>
      {
        label && (
          <Text size="xs">
            {label}
          </Text>
        )
      }
      <Input.Field>
        {
          icon && (
            <Icon icon={icon} />
          )
        }
        <Input.Input type={type} placeholder={placeholder} name={name} />
      </Input.Field>
    </Input.Root>
  );
}