class communityDataMap {

    get communityData() {
        return cy.get('[data-cy="communityDataBtn-desktop"]');
    };

    get communityDistrict() {
        return cy.get('[data-cy="districtButton"]');
    };

    get borough() {
        return cy.get('[data-cy="boroughButton"]');
    };

    get citywide() {
        return cy.get('[data-cy="citywideButton"]');
    };
}

export default new communityDataMap