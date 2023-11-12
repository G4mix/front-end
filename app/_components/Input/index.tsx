import React, { ChangeEvent } from "react";
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
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input = ({
  label, icon, type,
  placeholder, name, value,
  onChange, onBlur, onFocus }: InputProps
) => {
  return (
    <InputRoot>
      {label && <Text size="sm">{label}</Text>}
      <InputField>
        {icon && <Icon icon={icon} withoutClick />}
        <InputInput
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </InputField>
    </InputRoot>
  );
}
