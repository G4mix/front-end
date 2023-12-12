"use client";

import React from "react";
import { useCommentsContext } from "@contexts/post/CommentsContext";
import { Filter } from "@/app/_components/Filter/FilterDropdown";

export const FilterComments = () => {
  const { filterBy, handleFilterBy } = useCommentsContext();
  return (
    <Filter
      filterBy={filterBy}
      handleFilterBy={(option: string) => handleFilterBy(option as "all" | "recent" | "relevant")}
      options={{
        recent: "Recentes",
        relevant: "Relevantes",
        all: "Todos"
      }}
    />
  );
};