import { Trigger, CollapsibleTriggerProps } from "@radix-ui/react-collapsible";

export function CollapsableTrigger({ ...props }: CollapsibleTriggerProps) {
  return <Trigger {...props} />;
}