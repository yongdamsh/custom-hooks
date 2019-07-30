/// <reference types="Cypress" />


describe('basic use case', () => {
  beforeEach(() => {
    cy.visit('/packages/use-element-visibility/examples/basic.html');
  });

  it('should display a red box', () => {
    cy.get("[data-cy=red-box]").should('exist');
    cy.get("[data-cy=message]").should('contain', 'The red box is about 0.0');
  });

  it('shows 100% crossed message', () => {
    cy.scrollTo('bottom');

    cy.get('[data-cy=message]').should('contain', 'The red box is about 100');
  });
});
