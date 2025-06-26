/// <reference types="Cypress" />
import { theme } from "twin.macro";

describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/").get("main").injectAxe();
  });
  it("Has no detectable accessibility violations on load", () => {
    cy.log(`${theme`screens.md`}`);

    cy.checkA11y();
  });

  [
    ["About", /about/i],
    ["Contact", /contact/i],
    ["Technical Help", /technical help/i],
    ["Dent", /dent/i],
    ["Dranetz", /dranetz/i],
    ["Electrotek", /electrotek systems/i],
    ["Powerside", /powerside/i],
    ["Consultancy from IMH", /consultancy from imh/i],
  ].forEach(([label, regex]) => {
    it(`page, ${label}, has no detectable accessibility violations on load`, () => {
      cy.findAllByText(regex).first().click();

      cy.checkA11y();
    });
  });

  it("404 has no detectable accessibility violations on load", () => {
    cy.visit("/foo");

    const container = () => cy.get("#___gatsby");

    container().injectAxe();

    container()
      .findByText(/Preview custom 404 page/i)
      .click();

    cy.checkA11y();
  });
});
