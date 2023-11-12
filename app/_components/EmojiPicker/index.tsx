"use client";

import { EmojiPickerDropdown } from "./EmojiPickerDropdown";
import { Icon } from "@components/Icon";
import React from "react";

type EmojiPickerProps = {
  onSelect: (emoji: any) => void;
};

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <EmojiPickerDropdown onSelect={onSelect}>
      <Icon icon="smile" />
    </EmojiPickerDropdown>
  );
}