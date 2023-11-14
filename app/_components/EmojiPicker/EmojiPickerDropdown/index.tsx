"use client";

import React, { type ReactNode, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

type EmojiPickerDropdownProps = {
  onSelect: (emoji: string) => void;
  children: ReactNode;
}

export const EmojiPickerDropdown = ({ children, onSelect }: EmojiPickerDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root modal={false} open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenu.Trigger>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} side="top" align="start">
          <Picker
            autoFocus
            previewPosition="none"
            skinTonePosition="search"
            maxFrequentRows={0}
            data={data}
            onEmojiSelect={(emoji: { native: string; }) => {
              if (!emoji?.native) return;
              onSelect(emoji.native);
              setOpen(false);
            }}
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};