describe("Map catch-all page", () => {
  beforeEach(() => {
    cy.visit("/map/datatool");
  });

  context("desktop", () => {
    beforeEach(() => {
      // iffy because chakra breakpoints are defined in ems.
      cy.viewport(1080, 660);
    });

    it("should have a header", () => {
      cy.get("header").should("be.visible");
    });

    it("should switch geography when user uses Geography Select toolbar on Desktop size", () => {
      cy.url().should("include", "/map/datatool");

      cy.contains("Census").click();

      cy.url().should("include", "/map/datatool/census");

      cy.contains("Borough").click();

      cy.url().should("include", "/map/datatool/borough");

      cy.visit("/map/datatool/census");

      cy.contains("Census Area").should("have.attr", "data-active");
    });

    it("should switch view when user uses ViewSelect toolbar", () => {
      cy.url().should("include", "/map/datatool");

      cy.get('[data-cy="driBtn"]').click();

      cy.url().should("include", "/map/dri/puma");

      cy.get('[data-cy="dataToolBtn"]').click();

      cy.url().should("include", "/map/datatool");
    });

    it("ViewSelect should preserve previous view geo and geoid", () => {
      cy.visit("/map/datatool/census");

      cy.get('[data-cy="driBtn"]').click();

      cy.url().should("include", "/map/dri/puma");

      cy.get('[data-cy="dataToolBtn"]').click();

      cy.url().should("include", "/map/datatool/census");

      cy.visit("/map/datatool/borough/BK0202");

      cy.get('[data-cy="driBtn"]').click();

      cy.url().should("include", "/map/dri/puma");

      cy.get('[data-cy="dataToolBtn"]').click();

      cy.url().should("include", "/map/datatool/borough/BK0202");
    });
  });
});

export {};
