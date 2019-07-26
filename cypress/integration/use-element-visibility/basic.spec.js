/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('/packages/use-element-visibility/examples')
})

describe('basic use case', () => {
    it('should display a red box', () => {
        cy.get('[data-cy=red-box]').should('exist');
        cy.get('[data-cy=message]').should('contain', '0.0% crossed');
    })

    it('shows 100% crossed message', () => {
        cy.scrollTo('bottom');

        cy.get('[data-cy=message]').should('contain', '100.0% crossed');
    })
});
