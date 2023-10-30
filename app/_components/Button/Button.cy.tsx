import { Button } from "./index";
import React from "react";

describe("<Button />", () => {
  it("It is expected to mount and render a Button.", () => {
    cy.mount(<Button>Working Button</Button>);
    cy.get("button").contains("Working Button").should("not.be.disabled");
  });
  it("It is expected to mount and render a disabled Button.", () => {
    cy.mount(<Button disabled>Disabled button</Button>);
    cy.get("button").contains("Disabled button").should("be.disabled");
  });
});

export {};