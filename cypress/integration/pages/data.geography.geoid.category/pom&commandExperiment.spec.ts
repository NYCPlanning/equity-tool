import communityDataMap from '../pageObjectModel/communityDataMap.js'
import communityDataMapDrawer from '../pageObjectModel/communityDataMapDrawer.js'
import subGroupDropDown from '../pageObjectModel/subGroupDropDown.js'
import download from '../pageObjectModel/download.js'
import dataExplorerDrawer from '../pageObjectModel/dataExplorerDrawer.js'




describe("Experimenting with POM, custom commands, and configuration", () => {

  beforeEach(() => {
    cy.visit("map/data/district");
    cy.viewport(1920, 1080)
  });

    it("should switch between boundaries", () => {
      communityDataMap.borough.click(); // click on borough button 
      communityDataMap.borough.should("have.attr", "data-active"); // assertion 
    });

    it("should go back to welcome page", () => {
      cy.clickGeo('4004'); // visits URL for geoid 4004
      communityDataMapDrawer.geoInfoName.should('exist'); // 4004 geo name is displayed 
      communityDataMapDrawer.back.click(); // click on back button
      communityDataMapDrawer.welcomeText.should('exist'); // assert that welcome text exist 
    });

    it('Tables should exist for Housing Security, Affordability, and Quality for all subgroups', () => {
      cy.tableTesting('district', '4001', 'hsaq', 'tot'); // goes to the url 
      
      let tableHeader = [
      'Housing Tenure', 
      'Median Value (2019 dollars)', 
      'Median Gross Rent (2019 dollars)', 
      'Gross Rent as a Percentage of Household Income (GRAPI)',
      'Rental Units Affordable To Households By Area Median Income (AMI) Band',
      'Overcrowding',
      'Residential Evictions',
      'Number of Individuals in Shelter System by Last Address',
      'Income-Restricted Housing',
      'Population In NYC Housing Authority Housing'
      ]; // array for tables

      for (let i = 0; i < tableHeader.length; i++){  
          cy.contains(tableHeader[i]).should('exist') // loops through each element (tables) in the array for its existence 
      };

    })

    it('should select from drop down menu', () => {

      cy.tableTesting('district', '4001', 'hsaq', 'tot');

      subGroupDropDown.anh.should('have.value', 'anh');

      cy.url().should('include', '/anh');
  
    });

    it('should download file', () => {

      cy.tableTesting('district', '4001', 'hsaq', 'tot');

      download.downloadDataBtn.click(); // clicks on 'Download Data', download data Modal should pop up

      download.xls; // selects .xls file type 

      download.downloadDataModalBtn.click(); // clicks on 'Download Data' from Modal 

      cy.verifyDownload('4001_xlsx.zip', {timeout:5000}); // assert that the correct file is downloaded
      
    });

    it.only('should click on drawer content', () => {
      //cy.tableTesting('district', '4001', 'hsaq', 'tot');
      cy.clickGeo('4001')
      communityDataMapDrawer.demo.click()
      dataExplorerDrawer.demo.should('have.attr', 'data-active')
    })



  });

export {}
