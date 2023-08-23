import { Button } from "./index";
import React from "react";

describe("<Button />", () => {
  it("It is expected to assemble and render the content.", () => {
    cy.mount(<Button>Teste</Button>);
    cy.get("button").contains("Teste");
  });
});

export {};