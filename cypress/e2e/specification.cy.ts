describe('Specification', () => {
  it('can upload , edit and download specification', () => {
    // Last opp spesifikasjon
    cy.visit('localhost:3000');
    cy.contains('Last opp kravbank-fil').selectFile(
      './cypress/filesForUploadTesting/specification-1.pdf'
    );
    cy.contains('Rediger spesifikasjon').click();

    // Innhold i spesifikasjon
    const title = 'Test spesifikasjon';
    const organisation = 'Itland Data';
    const caseNumber = '123456/AA';
    const currency = 'Norske kroner (NOK)';
    const generalProduct = 'Generelle krav';
    const productName = 'Varebiler';
    const addProductButton = 'Legg til produkt';
    const editGeneralProductButton = 'Rediger generelle krav';
    const editProductButton = 'Rediger produktet';
    const deleteProductButton = 'Fjern produkt';

    const newTitle = 'Test spesifikasjon 2';
    const newOrganisation = 'dfø';
    const newCaseNumber = '123456/BB';
    const newCurrency = 'Europeiske euro (EUR)';

    cy.contains(title);
    cy.contains(organisation);
    cy.contains(caseNumber);
    cy.contains(currency);
    cy.contains(generalProduct);
    cy.contains(productName);

    console.log('test', cy.get('div').contains(addProductButton).parent());

    cy.get('div').contains(addProductButton).parent().should('have.attr', 'data-disabled', "false");
    cy.get('div').contains(editGeneralProductButton).parent().should('have.attr', 'data-disabled', "false");
    cy.get('div').contains(editProductButton).parent().should('have.attr', 'data-disabled', "false");
    cy.get('div').contains(deleteProductButton).parent().should('have.attr', 'data-disabled', "false");

    // Liste av produkter
    cy.get('ul').find('li').should('have.length', 2);

    // Rediger spesifikasjon
    cy.get('div').contains('Rediger spesifikasjon').click();
    cy.get('input[placeholder="Navn på spesifikasjon"]').clear().type(
      newTitle
    );
    cy.get('input[placeholder="Saksnummer"]').clear().type(newCaseNumber);
    cy.get('div').contains('Norske kroner (NOK)').click();
    cy.get('div').contains(newCurrency).click();
    cy.get('input[name="organization"]').clear().type(newOrganisation);

    // Sjekk at alle andre handlingsknapper er deaktivert under redigering
    cy.get('div').contains(addProductButton).parent().should('have.attr', 'data-disabled', "true");
    cy.get('div').contains(editGeneralProductButton).parent().should('have.attr', 'data-disabled', "true");
    cy.get('div').contains(editProductButton).parent().should('have.attr', 'data-disabled', "true");
    cy.get('div').contains(deleteProductButton).parent().should('have.attr', 'data-disabled', "true");

    // lagre
    cy.get('button').contains('Lagre').click();

    cy.contains(newTitle);
    cy.contains(newOrganisation);
    cy.contains(newCaseNumber);
    cy.contains(newCurrency);

    // lagre spesifikasjon
    cy.get('div').contains('Last ned spesifikasjon').click();


  });
});
