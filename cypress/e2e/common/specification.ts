import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { clickAndWaitForResponse } from './helpers';

Given('Jeg åpner startsiden', () => {
  cy.visit('localhost:3000');
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

Then(
  'Ser jeg tittel er {string}, organisasjon er {string}, saksnummer er {string} og myntenhet er {string}',
  (
    title: string,
    organisation: string,
    caseNumber: string,
    currency: string
  ) => {
    cy.contains(title);
    cy.contains(organisation);
    cy.contains(caseNumber);
    cy.contains(currency);
  }
);

Then('Ser jeg {int} produkt-er', (value: number) => {
  cy.get('ul').find('li').should('have.length', value);
});

Then(
  'Jeg klikker på {string} og velger {string}',
  (fieldName: string, value: string) => {
    cy.get('div').contains(fieldName).click();
    cy.get('div').contains(value).click();
  }
);

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

Then(
  'Klikker jeg på {string} knapp for å laste ned spesifikasjon',
  (button: string) => {
    clickAndWaitForResponse(
      cy.get('div').contains(button),
      'generateSpecification'
    );
  }
);
