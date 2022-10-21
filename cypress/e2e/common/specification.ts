import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { clickAndWaitForResponse } from "./helpers";

Given('Jeg åpner startsiden', () => {
  cy.visit('localhost:3000');
});

Given('Jeg åpner spesifikasjon', () => {
  cy.visit('localhost:3000');
  cy.contains('Last opp kravbank-fil').selectFile(
    './cypress/filesForUploadTesting/specification-1.pdf'
  );
  cy.contains('Rediger spesifikasjon').click();
});

When('Laste opp kravspesifikasjon', () => {
  cy.contains('Last opp kravbank-fil').selectFile(
    './cypress/filesForUploadTesting/specification-1.pdf'
  );
});

When('Velg rediger spesifikasjon', () => {
  cy.contains('Rediger spesifikasjon').click();
  cy.url().should('include', 'http://localhost:3000/specification/');
});

Then('Ser jeg {string}, {string}, {string} og {string} i side', (title: string, organisation: string, caseNumber: string, currency: string) => {
  cy.contains(title);
  cy.contains(organisation);
  cy.contains(caseNumber);
  cy.contains(currency);
});

Then('Ser jeg {int} produkt-er', (value: number) => {
  cy.get('ul').find('li').should('have.length', value);
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

Then('Jeg klikker på {string} og velger {string}', (fieldName: string, value: string) => {
  cy.get('div').contains(fieldName).click();
  cy.get('div').contains(value).click();
});

Then('Jeg klikker på {string} knapp for å lagre', (button: string) => {
  cy.get('button').contains(button).click();
});

Then('Ser jeg {string} knapp er aktiv', (value: string) => {
  cy.get('div')
    .contains(value)
    .parent()
    .should('have.attr', 'data-disabled', 'false');
});

Then('Ser jeg {string} knapp er deaktiv', (value: string) => {
  cy.get('div')
    .contains(value)
    .parent()
    .should('have.attr', 'data-disabled', 'true');
});

Then('Velg en produkttype', () => {
  cy.get('button').contains('Velg').last().click();
});

Then('Klikker jeg på {string} knapp for å laste ned spesifikasjon', (button: string) => {
  clickAndWaitForResponse(cy.get('div').contains(button), 'generateSpecification');
});
