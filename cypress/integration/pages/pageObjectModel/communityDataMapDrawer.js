class communityDataMapDrawer {

    get geoInfoName() {
        return cy.get('[data-cy="geoInfoPrimaryHeading"]');
    };

    get back() {
        return cy.get('[data-cy="exitCommunityDataSelection-desktop')
    }

    get welcomeText() {
        return cy.contains('Welcome')
    }
}

export default new communityDataMapDrawer
