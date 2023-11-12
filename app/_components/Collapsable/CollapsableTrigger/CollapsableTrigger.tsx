import { Trigger, CollapsibleTriggerProps } from "@radix-ui/react-collapsible";
import React from "react";

export const CollapsableTrigger = ({ ...props }: CollapsibleTriggerProps) => {
  return <Trigger {...props} />;
};