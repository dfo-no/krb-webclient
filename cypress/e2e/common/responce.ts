import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { clickAndWaitForResponse, uploadFile } from './helpers';

Given('Jeg åpner besvarelse {string}', (pdfName: string) => {
  cy.visit('localhost:3000');
  uploadFile(`cypress/filesForUploadTesting/${pdfName}`);
  cy.contains('Rediger besvarelse').click();
});

Then(
  'Klikker jeg på {string} knapp for å laste ned besvarelse',
  (button: string) => {
    clickAndWaitForResponse(cy.get('div').contains(button), 'generateResponse');
  }
);
