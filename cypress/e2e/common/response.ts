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

When('Jeg besvarer kravet med {string}', (answer: string) => {
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

Then('Ser jeg {string} krav', (title: string) => {
  cy.get('[class^="EditorFullPage"]').contains(title);
});

Then('Ser jeg {string} har {string}', (primary: string, secondary: string) => {
  cy.get('[class^="Toolbar_"]').contains(primary);
  cy.get('[class^="Toolbar_"]').contains(secondary);
});

Then(
  'Ser jeg absolutte krav av {string} produkt er {string}',
  (title: string, status: string) => {
    if (status === 'svart') {
      cy.get('[class^="EditorFullPage"]')
        .contains(title)
        .parent()
        .find(`[data-testid="CheckBoxOutlinedIcon"]`)
        .should('be.visible');
    } else if (status === 'ikke svart') {
      cy.get('[class^="EditorFullPage"]')
        .contains(title)
        .parent()
        .find(`[data-testid="WarningAmberOutlinedIcon"]`)
        .should('be.visible');
    }
  }
);

Then(
  'Jeg besvarer {string} kravet med {int}',
  (title: string, value: string) => {
    cy.get('[class^="ProductRequirementAnswer_"]')
      .contains(title)
      .parent()
      .parent()
      .find('input')
      .clear()
      .type(value);
  }
);
Then('Jeg besvarer {string} kravet med bekreftet', (title: string) => {
  cy.get('[class^="ProductRequirementAnswer_"]')
    .contains(title)
    .parent()
    .parent()
    .find('input')
    .click();
});

Then('Ser jeg kravet {string} er ikke aktiv', (fieldName: string) => {
  cy.get(`input[placeholder="${fieldName}"]`).should('be.disabled');
});
