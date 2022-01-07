describe("Map catch-all page", () => {
  beforeEach(() => {
    cy.visit("/map");
  });

  it("should have a header", () => {
    cy.get("header").should("be.visible");
  });

  it("should switch geography when user uses Geography Select toolbar", () => {
    cy.url().should("include", "/map");

    cy.contains("Census").click();

    cy.url().should("include", "/map/census");

    cy.contains("Borough").click();

    cy.url().should("include", "/map/borough");

    cy.visit("/map/census");

    cy.contains("Census Area").should("have.attr", "data-active");
  });
});

export {};
