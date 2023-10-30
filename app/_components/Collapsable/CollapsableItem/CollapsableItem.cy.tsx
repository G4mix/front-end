import { CollapsableItem } from "./index";
import React from "react";

describe("<CollapsableItem />", () => {
  it("renders children correctly", () => {
    const childText = "Test Child";
    cy.mount(<CollapsableItem id="item">{childText}</CollapsableItem>);
    cy.get("#item").should("contain", childText);
  });
});
