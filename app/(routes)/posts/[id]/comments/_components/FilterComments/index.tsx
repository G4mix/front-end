"use client";

import React from "react";
import { useCommentsContext } from "../../../../../../_contexts/CommentsContext";
import { Filter } from "@components/Filter";

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