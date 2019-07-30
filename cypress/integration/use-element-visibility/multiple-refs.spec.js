/// <reference types="Cypress" />

describe('multiple refs', () => {
  beforeEach(() => {
    cy.visit('/packages/use-element-visibility/examples/multiple-refs.html');
  });

  it('should be able to detect changes in the visibility of multiple nodes', () => {
    cy.get('[data-cy=red-box] > p').should('contain.text', '0');
    cy.get('[data-cy=blue-box] > p').should('contain.text', '0');
    cy.get('[data-cy=green-box] > p').should('contain.text', '0');

    cy.get('[data-cy=red-box]').scrollIntoView();
    cy.get('[data-cy=red-box] > p').invoke('text').should('be.greaterThan', 0);

    cy.get('[data-cy=blue-box]').scrollIntoView();
    cy.get('[data-cy=blue-box] > p').invoke('text').should('be.greaterThan', 0);

    cy.get('[data-cy=green-box]').scrollIntoView();
    cy.get('[data-cy=green-box] > p').invoke('text').should('be.greaterThan', 0);
  });
});
