import { CollapsableContent } from "./CollapsableContent";
import { CollapsableTrigger } from "./CollapsableTrigger/CollapsableTrigger";
import { CollapsableItem } from "./CollapsableItem";
import { CollapsableRoot } from "./CollapsableRoot";
import { Icon } from "../Icon";
import React from "react";

describe("<Collapsable />", () => {
  it("renders Collapsable correctly and need to open/close with success", () => {
    let open = true;

    const setOpen = () => {
      open = !open;
      cy.get("#content").invoke("attr", "data-state", open ? "open" : "closed");
    };

    cy.mount(
      <CollapsableRoot defaultOpen open={open} onOpenChange={setOpen} id="root">
        <CollapsableTrigger id="trigger" asChild><Icon icon="plus" /></CollapsableTrigger>
        <CollapsableContent id="content">
          <CollapsableItem>
            Hello world!
          </CollapsableItem>
        </CollapsableContent>
      </CollapsableRoot>
    );
    cy.get("#content").should("have.attr", "data-state", "open");
    cy.get("#trigger").click();
    cy.get("#content").should("have.attr", "data-state", "closed");
    cy.get("#trigger").click();
    cy.get("#content").should("have.attr", "data-state", "open");
  });
});