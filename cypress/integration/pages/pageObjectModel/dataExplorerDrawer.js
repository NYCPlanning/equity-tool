class dataExplorerDrawer {

    get geoInfoName() {
        return cy.get('[data-cy="geoInfoPrimaryHeading"]');
    };

    get demo() {
        return cy.contains('Demographic Conditions')
    }

    get econ() {
        return cy.contains('econ')
    }

    get hsaq() {
        return cy.contains('Housing Security, Affordability and Quality')
    }

    get hopd() {
        return cy.contains('Quality of Life and Access to Opportunity')
    }

    get collapseBtn() {
        return cy.get('.css-1ra321f').click()
    }
}

export default new dataExplorerDrawer
