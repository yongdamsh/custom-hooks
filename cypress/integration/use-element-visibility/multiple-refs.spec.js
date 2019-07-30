/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit('/packages/use-element-visibility/examples/multiple-refs.html');
});

describe('multiple refs', () => {
  it('should be able to detect changes in the visibility of multiple nodes', () => {
    cy.get('[data-cy=red-box] > p').should('contain.text', '0');
    cy.get('[data-cy=blue-box] > p').should('contain.text', '0');
    cy.get('[data-cy=green-box] > p').should('contain.text', '0');
  });
});
