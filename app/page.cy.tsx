import HomePage from "@/app/page";
import React from "react";

describe("<HomePage />", () => {
  it("It is expected to assemble and render the content.", () => {
    cy.mount(<HomePage />);
    cy.get('p').contains("Teste");
  })
});

export {};