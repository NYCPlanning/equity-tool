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

      cy.visit("/map/datatool/borough/BK0202");

      cy.get('[data-cy="driBtn-desktop"]').click();

      cy.url().should("include", "/map/dri/nta");

      cy.get('[data-cy="dataToolBtn-desktop"]').click();

      cy.url().should("include", "/map/datatool/borough/BK0202");
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
      cy.visit("/map/datatool/borough");

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Sunnyside & Woodside"
      );

      cy.visit("/map/datatool/borough/BK0202");

      cy.get('[data-cy="desktopSidebar"]').should(
        "not.contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="desktopSidebar"]').should(
        "contain",
        "Sunnyside & Woodside"
      );
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
      cy.get('[data-cy="mobileDrawer"]').should("be.visible");
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

    it("should display correct content in Drawer depending on view (Data Tool or DRI)", () => {
      cy.visit("/map/datatool/district");

      cy.get('[data-cy="mobileDrawer"]').should(
        "contain",
        "Or switch to the Displacement Risk Index"
      );

      cy.get('[data-cy="driBtn-mobile"]').click();

      cy.get('[data-cy="mobileDrawer"]').should(
        "contain",
        "Or switch to the Data Tool"
      );
    });

    // Leo to fill in
    // it("should display correct content in Drawer depending on if a geography is selected", () => {

    // });
    //

    // 1. Clone the project to your computer through git from GitHub (git clone)
    //     - https://github.com/NYCPlanning/equity-tool
    //     - git@github.com:NYCPlanning/equity-tool.git
    // 2. Checkout this branch in the repo: task/6802-sidebar-content-tests
    //      git checkout task/6802-sidebar-content-tests
    // 3. Now you're ready to get working on your own machine
    // 4. Start up the project locally
    //    `npm run dev`
    // 5. Start up Cypress test running client:
    //     `npm run e2e:open`
    // 6. Now you're ready to start coding out some tests!
    // 7. Open up this Cypress integration file on your own machine (VS Code)
    //       `cypress/integration/pages/Map/[[...subroutes]].spec.ts`

    // 8. Fill in the test above for Mobile, copying the format for Desktop
    //     (also delete these comments here)
    // 9. Stage your changes (reference your git tutorial)
    //     `git add cypress/integration/pages/Map/[[...subroutes]].spec.ts`
    // 10. Commit your changes
    //     `git commit -m "6802 write mobile test for displaying correct content based on is geo selected"`

    // 11. push your changes back to github
    //     `git push origin HEAD`
    // 12. Open a github PR for this branch
  });
});

export {};
