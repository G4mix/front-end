import { CollapsableContent } from "./CollapsableContent";
import { CollapsableTrigger } from "./CollapsableTrigger";
import { CollapsableItem } from "./CollapsableItem";
import { CollapsableRoot } from "./CollapsableRoot";

import { Icon } from "@components/Icon";
import { Text } from "@components/Text";

interface CollapsableProps {
  open: boolean;
  items: {
    icon: string;
    text: string;
  }[];
}

export function Collapsable({ open, items }: CollapsableProps) {
  return (
    <CollapsableRoot defaultOpen open={open}>
      <CollapsableContent>
        {items.map((item) => (
          <CollapsableItem key={item.text}>
            <Icon
              icon={item.icon as "x" | "check"}
              color="var(--carolina-blue)"
              style={{ color: "var(--carolina-blue)" }}
            />
            <Text size="xxs">{item.text}</Text>
          </CollapsableItem>
        ))}
      </CollapsableContent>
    </CollapsableRoot>
  );
}
