import React from "react";

import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import { InputInput } from "./InputInput";
import { InputField } from "./InputField";
import { InputRoot } from "./InputRoot";

interface ExampleVariations {
  placeholder: string;
  label?: string;
  icon?: "user" | "lock" | "envelope";
  type: "text" | "password" | "email";
  name: "username" | "password" | "email";
}

const variations: ExampleVariations[] = [
  {
    label: "Username",
    icon: "user",
    type: "text",
    placeholder: "Digite um nome de usuário válido",
    name: "username",
  },
  {
    label: "Password",
    icon: "lock",
    type: "password",
    placeholder: "Digite uma senha forte",
    name: "password",
  },
  {
    label: "Email",
    icon: "envelope",
    type: "email",
    placeholder: "Digite o seu e-mail",
    name: "email",
  },
  {
    label: "Username",
    type: "text",
    placeholder: "Digite um nome de usuário válido",
    name: "username",
  },
  {
    icon: "user",
    type: "text",
    placeholder: "Digite um nome de usuário válido",
    name: "username",
  },
  {
    type: "text",
    placeholder: "Digite um nome de usuário válido",
    name: "username",
  },
];

describe("<Input />", () => {
  for (const variation of variations) {
    const { label, icon, type, placeholder, name } = variation;

    it(`renders input correctly for ${type} type`, () => {
      cy.mount(
        <InputRoot>
          {label && (
            <Text size="xs" id="label">
              {label}
            </Text>
          )}
          <InputField>
            {icon && <Icon icon={icon} id={`icon-${icon}`} />}
            <InputInput
              type={type}
              placeholder={placeholder}
              name={name}
              id="input"
            />
          </InputField>
        </InputRoot>
      );

      if (label) {
        cy.get("#label").should("contain", label);
      } else {
        cy.get("#label").should("not.exist");
      }
      if (icon) {
        cy.get(`#icon-${icon}`).should("exist");
      } else {
        cy.get(`#icon-${icon}`).should("not.exist");
      }
      cy.get("#input")
        .should("have.attr", "type", type)
        .should("have.attr", "placeholder", placeholder)
        .should("have.attr", "name", name);
    });
  }
});
