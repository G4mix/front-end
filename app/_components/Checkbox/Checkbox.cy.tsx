import { Checkbox } from "./index";
import { Icon } from "../Icon";
import React from "react";

describe("<Checkbox />", () => {
  it("Should be checked.", () => {
    cy.mount(
      <Checkbox.Root>
        <Checkbox.Input checked id="input" />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("#input").should("be.checked");
  });

  it("Should not be checked.", () => {
    cy.mount(
      <Checkbox.Root>
        <Checkbox.Input id="input" />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("#input").should("not.be.checked");
  });
  it("Should be disabled.", () => {
    cy.mount(
      <Checkbox.Root id="root" disabled>
        <Checkbox.Input />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("#root").should(($el) => {
      const styles = window.getComputedStyle($el[0]);
  
      expect(styles.getPropertyValue("pointer-events")).to.equal("none");
      expect(styles.getPropertyValue("opacity")).to.equal("0.6");
    });
  });
  
  it("Should not be disabled.", () => {
    cy.mount(
      <Checkbox.Root id="root">
        <Checkbox.Input />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("#root").should(($el) => {
      const styles = window.getComputedStyle($el[0]);
  
      expect(styles.getPropertyValue("cursor")).to.equal("pointer");
      expect(styles.getPropertyValue("opacity")).to.equal("1");
    });
  });
});
