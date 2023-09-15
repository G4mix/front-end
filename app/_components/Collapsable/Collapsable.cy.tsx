import { Icon } from "../Icon";
import { CollapsableTrigger } from "./CollapsableTrigger";
import { Collapsable } from "./index";
import React from "react";

describe("<Collapsable />", () => {
  it("renders Collapsable correctly and need to open/close with success", () => {
    let open = true;

    const setOpen = () => {
      open = !open;
      cy.get("#content").invoke("attr", "data-state", open ? "open" : "closed");
    };

    cy.mount(
      <Collapsable.Root defaultOpen open={open} onOpenChange={setOpen} id="root">
        <CollapsableTrigger id="trigger" asChild><Icon icon="plus" /></CollapsableTrigger>
        <Collapsable.Content id="content">
          <Collapsable.Item>
            Hello world!
          </Collapsable.Item>
        </Collapsable.Content>
      </Collapsable.Root>
    );
    cy.get("#content").should("have.attr", "data-state", "open");
    cy.get("#trigger").click();
    cy.get("#content").should("have.attr", "data-state", "closed");
    cy.get("#trigger").click();
    cy.get("#content").should("have.attr", "data-state", "open");
  });
});