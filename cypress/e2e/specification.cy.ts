describe('Specification', () => {
  const title = 'Test kravspesifikasjon';
  const organisation = 'Itland Data';
  const caseNumber = '123456/AA';
  const currency = 'Norske kroner (NOK)';
  const generalProduct = 'Generelle krav';
  const productName = 'El-bil';
  const addProductButton = 'Legg til produkt';
  const editGeneralProductButton = 'Rediger generelle krav';
  const editProductButton = 'Rediger produktet';
  const deleteProductButton = 'Fjern produkt';

  const newTitle = 'Test kravspesifikasjon 2';
  const newOrganisation = 'dfø';
  const newCaseNumber = '123456/BB';
  const newCurrency = 'Europeiske euro (EUR)';

  const newProductTitle = 'Test product';
  const newProductDesc = 'Test description of product';

  it('can upload and show specification', () => {
    // upload specification
    cy.visit('localhost:3000');
    cy.contains('Last opp kravbank-fil').selectFile(
      './cypress/filesForUploadTesting/specification-1.pdf'
    );
    cy.contains('Rediger spesifikasjon').click();
    cy.url().should('include', 'http://localhost:3000/specification/');

    // Contents of specification
    cy.contains(title);
    cy.contains(organisation);
    cy.contains(caseNumber);
    cy.contains(currency);
    cy.contains(generalProduct);
    cy.contains(productName);

    cy.get('div')
      .contains(addProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'false');
    cy.get('div')
      .contains(editGeneralProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'false');
    cy.get('div')
      .contains(editProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'false');
    cy.get('div')
      .contains(deleteProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'false');

    // check the length of product
    cy.get('ul').find('li').should('have.length', 2);
  });

  it('can edit specification', () => {
    // edit specification
    cy.get('div').contains('Rediger spesifikasjon').click();
    cy.get('input[placeholder="Navn på spesifikasjon"]').clear().type(newTitle);
    cy.get('input[placeholder="Saksnummer"]').clear().type(newCaseNumber);
    cy.get('div').contains('Norske kroner (NOK)').click();
    cy.get('div').contains(newCurrency).click();
    cy.get('input[name="organization"]').clear().type(newOrganisation);

    // check that all other action buttons are disabled while editing
    cy.get('div')
      .contains(addProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'true');
    cy.get('div')
      .contains(editGeneralProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'true');
    cy.get('div')
      .contains(editProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'true');
    cy.get('div')
      .contains(deleteProductButton)
      .parent()
      .should('have.attr', 'data-disabled', 'true');

    // save changes
    cy.get('button').contains('Lagre').click();

    // New content in specification after editing
    cy.contains(newTitle);
    cy.contains(newOrganisation);
    cy.contains(newCaseNumber);
    cy.contains(newCurrency);
  });

  it('can add product', () => {
    cy.contains(addProductButton).click();

    // enter product information
    cy.get('button').contains('Velg').last().click();
    cy.get('input[name="title"]').clear().type(newProductTitle);
    cy.get('input[name="description"]').clear().type(newProductDesc);
    cy.get('input[name="amount"]').clear().type('2');

    // click save to add the new product
    cy.get('button').contains('Lagre').click();
    cy.get('button').contains('Lagre produkt').click();

    // check the length of product
    cy.get('ul').find('li').should('have.length', 3);
  });

  it("can save specification", function() {
    cy.get('div').contains('Last ned spesifikasjon').click();
  });
});
