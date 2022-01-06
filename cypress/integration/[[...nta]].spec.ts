describe("Map", () => {
  beforeEach(() => {
    cy.visit("/map");
  });

  it("should have a header", () => {
    cy.get("header").should("be.visible");
  });
});

export {};
