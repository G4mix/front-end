import { InputField } from "./InputField";
import { InputInput } from "./InputInput";
import { InputRoot } from "./InputRoot";

import { Text } from "@components/Text";
import { Icon } from "@components/Icon";

interface InputProps {
  placeholder: string;
  label?: string;
  icon?: "envelope" | "lock" | "user";
  type: "password" | "email" | "text";
  name: "password" | "email" | "username";
}

export function Input({ label, icon, type, placeholder, name }: InputProps) {
  return (
    <InputRoot>
      {label && <Text size="default">{label}</Text>}
      <InputField>
        {icon && <Icon icon={icon} />}
        <InputInput type={type} placeholder={placeholder} name={name} />
      </InputField>
    </InputRoot>
  );
}
