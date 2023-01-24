import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { clickAndWaitForResponse, uploadFile } from './helpers';

Given('Jeg åpner besvarelse {string}', (pdfName: string) => {
  cy.visit('localhost:3000');
  uploadFile(`cypress/filesForUploadTesting/${pdfName}`);
  cy.contains('Rediger besvarelse').click();
});

Given('Jeg lager besvarelse fra spesifikasjon {string}', (pdfName: string) => {
  cy.visit('localhost:3000');
  uploadFile(`cypress/filesForUploadTesting/${pdfName}`);
  cy.contains('Lag Besvarelse').click();
  cy.get(`input[placeholder="Navn på leverandør"]`).clear().type('Test');
  cy.get('button').contains('Lag Besvarelse').click();
});

When('Jeg besvare kravet med {string}', (answer: string) => {
  cy.get('label').contains(answer).click();
});

Then(
  'Klikker jeg på {string} knapp for å laste ned besvarelse',
  (button: string) => {
    clickAndWaitForResponse(cy.get('div').contains(button), 'generateResponse');
  }
);

Then('Ser jeg evaluert fradrag har verdi {string}', (value: string) => {
  cy.contains('Evaluert fradrag').parent().contains(value);
});
