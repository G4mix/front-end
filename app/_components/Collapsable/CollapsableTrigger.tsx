import { Trigger, CollapsibleTriggerProps } from "@radix-ui/react-collapsible";
import React from "react";

export function CollapsableTrigger({ ...props }: CollapsibleTriggerProps) {
  return <Trigger {...props} />;
}