import { CollapsableRoot } from "./index";
import React from "react";

describe("<CollapsableRoot />", () => {
  it("renders children correctly", () => {
    const childText = "Test Child";
    cy.mount(<CollapsableRoot id="root" defaultOpen open={true}>{childText}</CollapsableRoot>);
    cy.get("#root").should("contain", childText);
  });
});
