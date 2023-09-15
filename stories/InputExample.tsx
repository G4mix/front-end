import { Input } from "@components/Input";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";

export function InputExample() {
  return (
    <Input.Root>
      <Text size="xs">
        Senha
      </Text>
      <Input.Field>
        <Icon icon="lock" />
        <Input.Input type="password" />
      </Input.Field>
    </Input.Root>
  );
}