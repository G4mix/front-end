import { Checkbox } from "./index";
import { Icon } from "../Icon";
import React from "react";

describe("<Checkbox />", () => {
  it("Should be checked.", () => {
    cy.mount(
      <Checkbox.Root>
        <Checkbox.Input checked />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("input[type='checkbox']").should("be.checked");
  });

  it("Should not be checked.", () => {
    cy.mount(
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("input[type='checkbox']").should("not.be.checked");
  });
  it("Should be disabled.", () => {
    cy.mount(
      <Checkbox.Root disabled>
        <Checkbox.Input />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("input[type='checkbox']").should("be.disabled");
  });
  
  it("Should not be disabled.", () => {
    cy.mount(
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    );
    cy.get("input[type='checkbox']").should("not.be.disabled");
  });
});
