import { CollapsableContent } from "./index";
import { CollapsableRoot } from "../CollapsableRoot";
import React from "react";

describe("<InputRoot />", () => {
  it("renders children correctly", () => {
    const childText = "Test Child";
    cy.mount(
      <CollapsableRoot defaultOpen open={true}>
        <CollapsableContent id="content">{childText}</CollapsableContent>
      </CollapsableRoot>
    );
    cy.get("#content").should("contain", childText);
  });
});
