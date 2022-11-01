import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { clickAndWaitForResponse, uploadFile } from './helpers';

Given('Jeg laste opp spesifikasjon og velger {string}', (value: string) => {
  uploadFile('./cypress/filesForUploadTesting/2022-09-30_specification-4.pdf');
  cy.contains(value).click();
});

Then('Ser jeg {string} er aktivert', (text: string) => {
  cy.contains(text).parent().should('have.class', 'Evaluation_Active__WmWgq');
});

Then('Ser jeg {string} har {string} som resultat', (text: string, value: string) => {
  cy.get('div[class*="Result"]').should('contain', text).and('contain', value);
});

Then(
  'Klikker jeg på {string} knapp for å laste ned evaluering',
  (button: string) => {
    clickAndWaitForResponse(cy.get('div').contains(button), 'generateResponse');
  }
);
