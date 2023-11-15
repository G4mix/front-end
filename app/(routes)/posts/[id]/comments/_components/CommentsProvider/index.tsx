"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

type CommentsContextValuesProps = {
  filterBy: "all" | "recent" | "relevant";
  handleFilterBy: (option: "all" | "recent" | "relevant") => void;
};

const CommentsContext = createContext<CommentsContextValuesProps>({ filterBy: "all", handleFilterBy: () => null });

type CommentsProviderProps = {
  children: React.ReactNode;
};

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [filterBy, setFilterBy] = useState<"all" | "recent" | "relevant">("all");

  const handleFilterBy = useCallback((option: "all" | "recent" | "relevant") => {
    setFilterBy(option);
  }, []);

  return (
    <CommentsContext.Provider value={{ filterBy, handleFilterBy }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  return useContext(CommentsContext);
};