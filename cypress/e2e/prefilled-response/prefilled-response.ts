import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { clickAndWaitForResponse, uploadFile } from '../common/helpers';

Given('Jeg åpner forberedt besvarelse', () => {
  cy.visit('localhost:3000');
  uploadFile(
    'cypress/filesForUploadTesting/prefilledesponse-Kjøretøy til hjemmetjenesten.pdf'
  );
  cy.contains('Rediger forberedt besvarelse').click();
});

When('Velger jeg produkttype {string}', (type: string) => {
  cy.get('[class*="ProductSelection"]').contains(type).click();
});

Then('Ser jeg ikke {string} under krav på siden', (text: string) => {
  cy.get('[class*="Need"]').should('not.contain', text);
});

When(
  'Jeg klikker på {string} av kravet {string} for å besvare',
  (button: string, text: string) => {
    cy.contains(text).parent().contains(button).click();
  }
);

When('Velger jeg {string} fra kodeliste', (value: string) => {
  cy.get('[class*="Selection"]').contains(value).click();
});

When(
  'Jeg klikker på {string} knappen for å lagre besvare',
  (buttonText: string) => {
    cy.get('[aria-expanded="true"]')
      .parent()
      .children()
      .contains(buttonText)
      .click();
  }
);

Then('Ser jeg svaret {string} på siden', (answer: string) => {
  cy.get('[class*="Answer"]').contains(answer);
});

When(
  'Jeg velger {int} på verdi til kravet {string}',
  (value: number, need: string) => {
    cy.contains(need).parent().contains('Input').click();
    cy.contains(need)
      .parent()
      .get('input[type=number]')
      .type(`{selectAll}${value}`);
  }
);

Then(
  'Klikker jeg på {string} knapp for å laste ned forberedt besvarelse',
  (button: string) => {
    clickAndWaitForResponse(
      cy.get('div').contains(button),
      'generatePrefilledResponse'
    );
  }
);
