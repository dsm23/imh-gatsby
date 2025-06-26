/// <reference types="Cypress" />

describe('Lighthouse tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should pass the audits', function () {
    cy.lighthouse();
    cy.pa11y();
  });
});
