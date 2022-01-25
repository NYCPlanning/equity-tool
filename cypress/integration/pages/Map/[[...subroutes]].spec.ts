describe("Map catch-all page", () => {
  beforeEach(() => {
    cy.visit("/map/datatool");
  });

  it("should have a header", () => {
    cy.get("header").should("be.visible");
  });

  it("should switch geography when user uses Geography Select toolbar", () => {
    cy.url().should("include", "/map/datatool");

    cy.contains("Census").click();

    cy.url().should("include", "/map/datatool/census");

    cy.contains("Borough").click();

    cy.url().should("include", "/map/datatool/borough");

    cy.visit("/map/datatool/census");

    cy.contains("Census Area").should("have.attr", "data-active");
  });
});

export {};
