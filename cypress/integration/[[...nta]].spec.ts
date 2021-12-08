describe("Map", () => {
  beforeEach(() => {
    cy.visit("/nta");
  });

  it("should have a header", () => {
    cy.get("header").should("be.visible");
  });
});

export {};
