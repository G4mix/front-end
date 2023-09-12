import { Button } from "./index";
import React from "react";

describe("<Button />", () => {
  it("It is expected to mount and render the content.", () => {
    cy.mount(<Button>Teste</Button>);
    cy.get("button").contains("Teste");
  });
});

export {};