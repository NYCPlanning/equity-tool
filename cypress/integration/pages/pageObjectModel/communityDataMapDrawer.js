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

    get demo() {
        return cy.contains('Demographic Conditions')
    }

    get econ() {
        return cy.contains('econ')
    }

    get hsaq() {
        return cy.contains('Housing Security, Affordability and Quality')
    }

    get hopd () {
        return cy.contains('Quality of Life and Access to Opportunity')
    }
}

export default new communityDataMapDrawer
