import { Text } from "./index";
import React from "react";

const sizes = ["xxs", "xs", "sm", "default", "md", "lg"];

describe("<Text />", () => {
  it("It is expected to render all text types.", () => {
    for(const size of sizes) {
      cy.mount(<Text size={size as "xs" | "sm" | "default" | "md" | "lg"} id={`${size}Text`}>Text size: {size}</Text>);
      cy.get(`#${size}Text`).contains(`Text size: ${size}`);
    }
  });    
});

export {};