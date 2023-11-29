import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // baseUrl: "http://localhost:3000",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack"
    },
    specPattern: "app/_components/**/*.cy.{js,jsx,ts,tsx}"
  }
});