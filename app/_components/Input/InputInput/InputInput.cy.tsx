import { InputInput } from "./index";
import React from "react";

const variations: React.FC<React.ComponentProps<typeof InputInput>>["defaultProps"][] = [
  {
    placeholder: "Digite o seu nome de usuário",
    type: "text",
    name: "username"
  },
  {
    placeholder: "Digite uma senha forte",
    type: "password",
    name: "password"
  },
  {
    placeholder: "Digite o seu e-mail",
    type: "email",
    name: "email"
  },
];

describe("<InputInput />", () => {
  for (const variation in variations) {
    it(`renders text input correctly`, () => {
      const { placeholder, type, name } = variations[variation]!;
    
      cy.mount(<InputInput type={type!} placeholder={placeholder!} name={name!} id="input" />);
      
      cy.get("#input")
        .should("have.attr", "type", type)
        .should("have.attr", "placeholder", placeholder)
        .should("have.attr", "name", name);
    });
  }
});