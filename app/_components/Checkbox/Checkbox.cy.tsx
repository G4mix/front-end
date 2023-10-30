import { CheckboxIndicatorContainer } from "./CheckboxIndicatorContainer";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxRoot } from "./CheckboxRoot";
import { Icon } from "../Icon";
import React from "react";

describe("<Checkbox />", () => {
  it("Should be checked.", () => {
    cy.mount(
      <CheckboxRoot>
        <CheckboxInput checked id="input" />
        <CheckboxIndicatorContainer>
          <CheckboxIndicator>
            <Icon icon="check" height={16} />
          </CheckboxIndicator>
        </CheckboxIndicatorContainer>
      </CheckboxRoot>
    );
    cy.get("#input").should("be.checked");
  });

  it("Should not be checked.", () => {
    cy.mount(
      <CheckboxRoot>
        <CheckboxInput id="input" />
        <CheckboxIndicatorContainer>
          <CheckboxIndicator>
            <Icon icon="check" height={16} />
          </CheckboxIndicator>
        </CheckboxIndicatorContainer>
      </CheckboxRoot>
    );
    cy.get("#input").should("not.be.checked");
  });
  it("Should be disabled.", () => {
    cy.mount(
      <CheckboxRoot id="root" disabled>
        <CheckboxInput />
        <CheckboxIndicatorContainer>
          <CheckboxIndicator>
            <Icon icon="check" height={16} />
          </CheckboxIndicator>
        </CheckboxIndicatorContainer>
      </CheckboxRoot>
    );
    cy.get("#root").should(($el) => {
      const styles = window.getComputedStyle($el[0]);
  
      expect(styles.getPropertyValue("pointer-events")).to.equal("none");
      expect(styles.getPropertyValue("opacity")).to.equal("0.6");
    });
  });
  
  it("Should not be disabled.", () => {
    cy.mount(
      <CheckboxRoot id="root">
        <CheckboxInput />
        <CheckboxIndicatorContainer>
          <CheckboxIndicator>
            <Icon icon="check" height={16} />
          </CheckboxIndicator>
        </CheckboxIndicatorContainer>
      </CheckboxRoot>
    );
    cy.get("#root").should(($el) => {
      const styles = window.getComputedStyle($el[0]);
  
      expect(styles.getPropertyValue("cursor")).to.equal("pointer");
      expect(styles.getPropertyValue("opacity")).to.equal("1");
    });
  });
});
