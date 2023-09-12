import { Heading } from "./index";
import React from "react";

const sizes = ["xs", "sm", "default", "md", "lg"];

describe("<Heading />", () => {
  it("It is expected to render all heading types.", () => {
    for(const size of sizes) {
      cy.mount(<Heading size={size as "xs" | "sm" | "default" | "md" | "lg"} id={`${size}Heading`}>Heading size: {size}</Heading>);
      cy.get(`#${size}Heading`).contains(`Heading size: ${size}`);
    }
  });    
});

export {};