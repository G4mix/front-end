import { apiErrors } from "@constants/apiErrors";
import { ErrorsToast } from "./index";
import React from "react";

describe("<ErrorsToast />", () => {
  it("It is expected to render all errors.", () => {
    for(const error in apiErrors) {
      const setOpen = () => console.log("fake setOpen");
      cy.mount(<ErrorsToast error={error as keyof typeof apiErrors} open={true} setOpen={setOpen} />);
      cy.contains(apiErrors[error as keyof typeof apiErrors]).should("have.css", "color", "rgb(255, 255, 255)");
    }
  });
});

export {};