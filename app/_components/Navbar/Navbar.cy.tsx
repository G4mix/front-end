import React from "react";
import { Navbar } from "./index";

describe("<Navbar />", () => {
  it("Should be able to render the navbar.", () => {

    cy.mount(
      <Navbar
        session={{
          username: "Test",
          email: "Test@gmail.com",
          icon: null,
        }}
      />
    );

    cy.get("nav").should("be.visible");
  });
});
