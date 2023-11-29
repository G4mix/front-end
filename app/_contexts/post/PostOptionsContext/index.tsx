"use client";

import { MoreOptionsOwnerDropdown } from "@/app/(routes)/(feed)/_components/Post/PostHeader/MoreOptions/MoreOptionsDropdown";
import { OptionsDiv } from "@components/OptionsDiv";
import React, { createContext, useState, useContext, useCallback } from "react";

type PostOptionsContextValuesProps = {
  handleToggleOwnerPostDropdown: (handleDeletePost: () => Promise<void>, id?: number) => void;
};

const PostOptionsContext = createContext<PostOptionsContextValuesProps>(
  { 
    handleToggleOwnerPostDropdown: () => null
  }
);

type PostOptionsProviderProps = {
  className?: string;
  children: React.ReactNode;
};

export type OwnerPostState = { handleDeletePost: () => Promise<void>; id?: number; };

export const PostOptionsProvider = ({ children, className="" }: PostOptionsProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ownerPostDropdown, setOwnerPostDropdown] = useState<OwnerPostState>({
    handleDeletePost: async () => undefined, id: undefined
  });

  const handleToggleOwnerPostDropdown = useCallback((handleDeletePost: () => Promise<void>, id?: number) => {
    if (id === ownerPostDropdown.id) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setOwnerPostDropdown({ handleDeletePost, id });
    }
  }, [ownerPostDropdown.id]);

  return (
    <PostOptionsContext.Provider value={{ handleToggleOwnerPostDropdown }}>
      {children}
      <OptionsDiv isShowingOption={isOpen}>
        <MoreOptionsOwnerDropdown
          ownerPostDropdown={ownerPostDropdown}
          setOpen={setIsOpen}
          className={className}
          open={isOpen}
        />
      </OptionsDiv>
    </PostOptionsContext.Provider>
  );
};

export const usePostOptionsContext = () => {
  return useContext(PostOptionsContext);
};