"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { ContentLink } from "./ContentLink";
import React from "react";

export const ContentLinks = () => {
  const { links } = useCreatePostContext();
  return (
    <>
      {
        links.map((link) => 
          <ContentLink url={link} key={link} />
        )
      }
    </>
  );
};