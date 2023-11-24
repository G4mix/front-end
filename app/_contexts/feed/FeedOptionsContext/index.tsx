"use client";

import { MoreOptionsOwnerDropdown } from "@/app/(routes)/(feed)/_components/Post/PostHeader/MoreOptions/MoreOptionsDropdown";
import React, { createContext, useState, useContext, useCallback } from "react";

type FeedOptionsContextValuesProps = {
  handleToggleOwnerPostDropdown: (handleDeletePost: () => void, id?: number) => void;
};

const FeedOptionsContext = createContext<FeedOptionsContextValuesProps>(
  { 
    handleToggleOwnerPostDropdown: () => null
  }
);

type FeedOptionsProviderProps = {
  children: React.ReactNode;
};

type OwnerPostState = { handleDeletePost: () => void; id?: number; };

export const FeedOptionsProvider = ({ children }: FeedOptionsProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ownerPostDropdown, setOwnerPostDropdown] = useState<OwnerPostState>({
    handleDeletePost: () => undefined, id: undefined
  });

  const handleToggleOwnerPostDropdown = useCallback((handleDeletePost: () => void, id?: number) => {
    if (id === ownerPostDropdown.id) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setOwnerPostDropdown({ handleDeletePost, id });
    }
  }, [ownerPostDropdown.id]);

  return (
    <FeedOptionsContext.Provider value={{ handleToggleOwnerPostDropdown }}>
      {children}
      <MoreOptionsOwnerDropdown
        id={ownerPostDropdown.id}
        handleDeletePost={ownerPostDropdown.handleDeletePost}
        setOpen={setIsOpen}
        open={isOpen}
      />
    </FeedOptionsContext.Provider>
  );
};

export const useFeedOptionsContext = () => {
  return useContext(FeedOptionsContext);
};