describe("Map catch-all page", () => {
  beforeEach(() => {
    cy.visit("/map/datatool/district");
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

      cy.contains("Community District*").click();

      cy.url().should("include", "/map/datatool/district");

      cy.contains("Borough").click();

      cy.url().should("include", "/map/datatool/borough");

      cy.visit("/map/datatool/district");

      cy.contains("Community District*").should("have.attr", "data-active");
    });

    it("should switch view when user uses ViewToggle toolbar", () => {
      cy.url().should("include", "/map/datatool");

      cy.get('[data-cy="driBtn-desktop"]').click();

      cy.url().should("include", "/map/dri/nta");

      cy.get('[data-cy="dataToolBtn-desktop"]').click();

      cy.url().should("include", "/map/datatool");
    });

    it("ViewToggle should preserve previous view geo and geoid", () => {
      cy.visit("/map/datatool/district");

      cy.get('[data-cy="driBtn-desktop"]').click();

      cy.url().should("include", "/map/dri/nta");

      cy.get('[data-cy="dataToolBtn-desktop"]').click();

      cy.url().should("include", "/map/datatool/district");

      cy.visit("/map/datatool/borough?geoid=BK0202");

      cy.get('[data-cy="driBtn-desktop"]').click();

      cy.url().should("include", "/map/dri/nta");

      cy.get('[data-cy="dataToolBtn-desktop"]').click();

      cy.url().should("include", "/map/datatool/borough?geoid=BK0202");
    });

    it("should display correct content in Sidebar depending on view (Data Tool or DRI)", () => {
      cy.visit("/map/datatool/district");

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="driBtn-desktop"]').click();

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Or switch to the Data Tool"
      );
    });

    it("should display correct content in Sidebar depending on if a geography is selected", () => {
      cy.visit("/map/datatool/district");

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Sunnyside & Woodside"
      );

      cy.visit("/map/datatool/district?geoid=4109");

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Sunnyside & Woodside"
      );
    });

    it("should render correct geography information for each geography type", () => {
      cy.visit("/map/datatool/district?geoid=4108");

      cy.get('[data-cy="geoInfoPrimaryHeading"]').should(
        "contain",
        "Forest Hills & Rego Park"
      );

      cy.visit("/map/datatool/borough?geoid=Queens");

      cy.get('[data-cy="geoInfoPrimaryHeading"]').should("contain", "Queens");

      cy.visit("/map/datatool/citywide?geoid=nyc");

      cy.get('[data-cy="geoInfoPrimaryHeading"]').should("contain", "Citywide");

      cy.visit("/map/dri/nta?geoid=BK76");

      cy.get('[data-cy="geoInfoPrimaryHeading"]').should(
        "contain",
        "BK76 - Greenpoint"
      );
    });

    it("should clear selection when user hits 'back' button", () => {
      cy.visit("/map/datatool/district?geoid=4108");

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Forest Hills & Rego Park"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="exitDataToolSelection-desktop"]').click();

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Forest Hills & Rego Park"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );
    });

    it("GeographySelect should remember previously selected District and Borough", () => {
      cy.visit("/map/datatool/district?geoid=4108");

      cy.get('[data-cy="boroughButton"]').click();

      cy.url().should("not.include", "district?geoid=4108");

      cy.get('[data-cy="districtButton"]').click();

      cy.url().should("include", "district?geoid=4108");

      cy.visit("/map/datatool/borough?geoid=BK0202");

      cy.get('[data-cy="districtButton"]').click();

      cy.url().should("not.include", "borough?geoid=BK0202");

      cy.get('[data-cy="boroughButton"]').click();

      cy.url().should("include", "borough?geoid=BK0202");
    });
  });

  context("mobile", () => {
    beforeEach(() => {
      // iffy because chakra breakpoints are defined in ems.
      cy.viewport(600, 660);
    });

    it("should only show Mobile Drawer", () => {
      cy.get('[data-cy="desktopSidebar"]').should("not.be.visible");

      cy.get('[data-cy="openMobileDrawer"]').click();
      cy.get('[data-cy="mobileDrawer-welcome"]').should("be.visible");
    });

    it("should allow opening and closing Mobile Drawer", () => {
      cy.get('[data-cy="openMobileDrawer"]').click();
      cy.get('[data-cy="closeMobileDrawer"]').click();
    });

    it("should switch view when user uses ViewToggle toolbar", () => {
      cy.url().should("include", "/map/datatool");

      cy.get('[data-cy="driBtn-mobile"]').click();

      cy.url().should("include", "/map/dri/nta");

      cy.get('[data-cy="dataToolBtn-mobile"]').click();

      cy.url().should("include", "/map/datatool");
    });

    // Switching to Borough suddenly exceeded 4000ms... perhaps due to some MVT errors
    it(
      "should switch geography when user uses Geography Select toolbar on Mobile",
      {
        defaultCommandTimeout: 4000,
      },
      () => {
        cy.url().should("include", "/map/datatool");

        cy.get('[data-cy="districtButton"]').click();

        cy.url().should("include", "/map/datatool/district");

        cy.get('[data-cy="boroughButton"]').click();

        cy.url().should("include", "/map/datatool/borough");

        cy.visit("/map/datatool/district");

        cy.contains("Community District*").should("have.attr", "data-active");
      }
    );

    it("should display correct content in Drawer depending on view (Data Tool or DRI)", () => {
      cy.visit("/map/datatool/district");

      cy.get('[data-cy="mobileDrawer-welcome"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="driBtn-mobile"]').click();

      cy.get('[data-cy="mobileDrawer-welcome"]').should(
        "contain",
        "Or switch to the Data Tool"
      );
    });

    it("should display correct content in Sidebar depending on if a geography is selected", () => {
      cy.visit("/map/datatool/district");

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Sunnyside & Woodside"
      );

      cy.visit("/map/datatool/district?geoid=4109");

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Sunnyside & Woodside"
      );
    });

    it("should clear selection when user hits 'back' button", () => {
      cy.visit("/map/datatool/district?geoid=4108");

      cy.get('[data-cy="mobileDrawer-datatool"]').should(
        "contain",
        "Forest Hills & Rego Park"
      );

      cy.get('[data-cy="mobileDrawer-welcome"]').should("not.exist");

      cy.get('[data-cy="exitDataToolSelection-mobile"]').click();

      cy.get('[data-cy="mobileDrawer-datatool"]').should("not.exist");

      cy.get('[data-cy="mobileDrawer-welcome"]').should("exist");
    });
  });
});

export {};
