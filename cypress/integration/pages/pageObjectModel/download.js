class download { 

    get downloadDataBtn() {
        return cy.get('.css-zlmdk2 > .chakra-button')    
    }

    get closeModal() {
        return cy.get('.chakra-modal__close-btn')
    }

    get xls() {
        return cy.get('[type="radio"]').check('xls', {force: true})
    }

    get pdf() {
        return cy.get('[type="radio"]').check('pdf', {force: true})
    }
    
    //download from the modal popup 
    get downloadDataModalBtn() {
        return cy.get('.chakra-link > .chakra-button').click()
    }

    
}

export default new download


