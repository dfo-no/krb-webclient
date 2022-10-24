import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('Jeg åpner spesifikasjon', () => {
  cy.visit('localhost:3000');
  cy.contains('Last opp kravbank-fil').selectFile(
    './cypress/filesForUploadTesting/specification-1.pdf'
  );
  cy.contains('Rediger spesifikasjon').click();
});

Given('Jeg åpner produkt-spesifikasjon side', () => {
  cy.visit('localhost:3000');
  cy.contains('Last opp kravbank-fil').selectFile(
    './cypress/filesForUploadTesting/specification-1.pdf'
  );
  cy.contains('Rediger spesifikasjon').click();
  cy.get('div').contains('Rediger produktet').click();
});

When('Jeg klikker på {string} knapp', (value: string) => {
  cy.get('div').contains(value).click();
});

Then('Jeg skriver {string} i feltet {string}', (text: string, fieldName: string) => {
  cy.get(`input[placeholder="${fieldName}"]`).clear().type(text);
});

Then('Jeg skriver {int} i feltet {string}', (text: string, fieldName: number) => {
  cy.get(`input[placeholder="${fieldName}"]`).clear().type(text);
});

Then('Ser jeg {string} knappen er deaktiv', (value: string) => {
  cy.get('button')
    .contains(value)
    .should('be.disabled');
});

Then('Jeg klikker på {string} knapp for å lagre', (button: string) => {
  cy.get('button').contains(button).click();
});
