import { Collapsable } from "@components/Collapsable";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";

interface CollapsableExampleProps {
  open: boolean;
}

export function CollapsableExample({ open }: CollapsableExampleProps) {
  const items = [
    {
      icon: "x",
      text: "Um caractere maiúsculo"
    },
    {
      icon: "check",
      text: "Um número"
    },
    {
      icon: "x",
      text: "Um caractere especial"
    },
    {
      icon: "x",
      text: "No mínimo 8 caracteres"
    }
  ]
  return (
    <Collapsable.Root defaultOpen open={open}>
      <Collapsable.Content>
        {
          items.map(item =>
            <Collapsable.Item key={item.text}>
              <Icon icon={item.icon as "x" | "check"} style={{color: "var(--carolina-blue)"}} />
              <Text size="xxs">
                {item.text}
              </Text>
            </Collapsable.Item>
          )
        }
      </Collapsable.Content>
    </Collapsable.Root>
  );
}