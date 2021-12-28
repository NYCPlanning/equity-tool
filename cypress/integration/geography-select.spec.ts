describe("Geography Selection", () => {
  it("should transition to new route when switching geography", () => {
    cy.visit('/census')

    cy.contains("Borough").click()

    cy.url().should('include', '/nta')
  });
});

export {};
