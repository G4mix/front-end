import { Checkbox } from "./index";

describe("<Checkbox />", () => {
  it("Should be checked.", () => {
    cy.mount(<Checkbox checked />);
    cy.get("input[type='checkbox']").should("be.checked");
  });

  it("Should not be checked.", () => {
    cy.mount(<Checkbox />);
    cy.get("input[type='checkbox']").should("not.be.checked");
  });
  it("Should be disabled.", () => {
    cy.mount(<Checkbox disabled />);
    cy.get("input[type='checkbox']").should("be.disabled");
  });
  
  it("Should not be disabled.", () => {
    cy.mount(<Checkbox />);
    cy.get("input[type='checkbox']").should("not.be.disabled");
  });
});
