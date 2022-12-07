import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { uploadFile, uploadResponseFileForEvaluation } from './helpers';

Given('Jeg åpner startsiden', () => {
  cy.visit('localhost:3000');
});

Given('Jeg åpner spesifikasjon {string}', (pdfName: string) => {
  uploadFile(`./cypress/filesForUploadTesting/${pdfName}`);
  cy.contains('Rediger spesifikasjon').click();
});

Given('Jeg åpner produkt-spesifikasjon side', () => {
  uploadFile('./cypress/filesForUploadTesting/specification-1.pdf');
  cy.contains('Rediger spesifikasjon').click();
  cy.get('div').contains('Rediger produktet').click();
});

When('Jeg laster opp besvarelse', () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);
  uploadResponseFileForEvaluation(
    './cypress/filesForUploadTesting/2022-11-30-citronen-response-5.pdf'
  );
});

When('Jeg klikker på {string} knapp', (value: string) => {
  cy.get('div').contains(value).click();
});

Then('Jeg klikker på {string} knappen', (button: string) => {
  cy.get('button').contains(button).click();
});

When(
  'Jeg kan velge navn ved å klikke på {string} knappen',
  (button: string) => {
    cy.get('li > div > button').contains(button).click();
  }
);

When(
  'Jeg skriver {string} i feltet {string}',
  (text: string, fieldName: string) => {
    cy.get(`input[placeholder="${fieldName}"]`).clear().type(text);
  }
);

When(
  'Jeg skriver {int} i feltet {string}',
  (text: string, fieldName: number) => {
    cy.get(`input[placeholder="${fieldName}"]`).clear().type(text);
  }
);

When(
  'Jeg søker etter {string} på hjemmesiden og klikker på det første forslaget',
  (bankName: string) => {
    cy.contains('Søk etter').parent().click().type(bankName);
    cy.contains(bankName).click();
  }
);

Then('Ser jeg {string} på siden', (value: string) => {
  cy.contains(value);
});

Then('Ser jeg {string} knappen er inaktiv', (value: string) => {
  cy.get('button').contains(value).should('be.disabled');
});


Then('Jeg venter litt', () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(200);
});

Then('Jeg klikker på {string} knapp for å lagre', (button: string) => {
  cy.get('button').contains(button).click();
});

Then('Ser jeg url inneholder {string}', (url: string) => {
  cy.url().should('include', url);
});
