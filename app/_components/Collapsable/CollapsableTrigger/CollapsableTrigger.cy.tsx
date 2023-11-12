import { CollapsableRoot } from "../CollapsableRoot";
import { CollapsableTrigger } from "./CollapsableTrigger";
import React from "react";

describe("<CollapsableTrigger />", () => {
  it("renders trigger correctly", () => {
    cy.mount(
      <CollapsableRoot defaultOpen open={true}>
        <CollapsableTrigger id="trigger" />
      </CollapsableRoot>
    );
    cy.get("#trigger").should("exist");
  });
});