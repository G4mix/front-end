import { InputRoot } from "./index";
import React from "react";

describe("<InputRoot />", () => {
  it("renders children correctly", () => {
    const childText = "Test Child";
    cy.mount(<InputRoot id="root">{childText}</InputRoot>);
    cy.get("#root").should("contain", childText);
  });
});
