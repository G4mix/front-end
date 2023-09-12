import { icons } from "@constants/icons";
import { Icon } from "./index";
import React from "react";

describe("<Button />", () => {
  it("It is expected to render all Icons.", () => {
    for(const icon in icons) {
      cy.mount(<Icon icon={icon as keyof typeof icons} id="testingIcon" />);
      cy.get("#testingIcon").should("have.css", "color", "rgb(255, 255, 255)");
    }
  });
});

export {};