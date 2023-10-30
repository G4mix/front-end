import { InputField } from "./index";
import React from "react";

describe("<InputField />", () => {
  it("renders children correctly", () => {
    const childText = "Test Child";
    cy.mount(<InputField id="field">{childText}</InputField>);
    cy.get("#field").should("contain", childText);
  });
});