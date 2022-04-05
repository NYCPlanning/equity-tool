describe("data/geography/geoid/category/subgroup page", () => {
  beforeEach(() => {
    cy.visit("data/borough/1/hsaq/tot");
  });

  context("desktop", () => {
    beforeEach(() => {
      // iffy because chakra breakpoints are defined in rems.
      cy.viewport(1080, 660);
    });

    it("should have a header", () => {
      cy.get("header").should("be.visible");
    });

    it("should return user to map page through header logo with current geography selected", () => {
      cy.get('[data-test="header-app-title"]').click();

      cy.url().should("include", "/map/datatool/borough?geoid=1");

      cy.visit("data/borough/1/hsaq/tot");

      cy.get('[data-test="header-app-logo"]').click();

      cy.url().should("include", "/map/datatool/borough?geoid=1");
    });
  });
});

export {};
