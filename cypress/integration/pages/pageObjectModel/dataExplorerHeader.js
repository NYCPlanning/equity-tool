class dataExplorerHeader {

    get geoInfoName() {
        return cy.get('[data-cy="geoInfoPrimaryHeading"]');
    };

    get backToMap() {
        return cy.get('.css-1dkrp62')
    }

}

class subGroupDropDown { 

    get anh() {
        return cy.get('.chakra-select').select('anh')
    }


}

export default new subGroupDropDown


