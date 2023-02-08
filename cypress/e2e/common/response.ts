/* eslint-disable cypress/no-unnecessary-waiting */
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

Then(
  'Ser jeg {string} for produkt {string} har {string}',
  (primary: string, product: string, secondary: string) => {
    cy.contains(product)
      .parentsUntil('li')
      .contains(primary)
      .parent()
      .contains(secondary);
  }
);

Then(
  'Ser jeg absolutte krav av {string} produkt er {string}',
  (title: string, status: string) => {
    if (status === 'svart') {
      cy.get('[class^="EditorFullPage"]')
        .contains(title)
        .parent()
        .parent()
        .find(`[data-testid="CheckBoxOutlinedIcon"]`)
        .should('be.visible');
    } else if (status === 'ikke svart') {
      cy.get('[class^="EditorFullPage"]')
        .contains(title)
        .parent()
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
      .clear({ force: true })
      .clear({ force: true })
      .type(value);
  }
);

Then('Jeg besvarer {string} kravet med {string}', (title: string, value: string) => {
    cy.get('[class^="ProductRequirementAnswer_"]')
        .contains(title)
        .parent()
        .parent()
        .contains(value)
        .click();
});

Then('Jeg besvarer {string} kravet med bekreftet', (title: string) => {
  cy.get('[class^="ProductRequirementAnswer_"]')
    .contains(title)
    .parent()
    .parent()
    .find('input')
    .click();
});

When('Jeg klikker på accordian knapp av produkt {string}', (title: string) => {
  cy.contains(title)
    .parentsUntil('li')
    .find(
      title === 'Generelle krav'
        ? `[data-testid="ExpandMoreIcon"]`
        : `[class*="Header"]`
    )
    .click();
  cy.wait(500);
});

Then('Ser jeg kravet {string} er ikke aktiv', (fieldName: string) => {
  cy.get(`input[placeholder="${fieldName}"]`).should('be.disabled');
});

Then('Ser jeg {string} er ikke aktiv', (button: string) => {
  cy.get('[class*="button_"]').contains(button).parent().should('be.disabled');
});

Then('Ser jeg produkt {string} er åpent', (productName: string) => {
  cy.contains(productName)
    .parentsUntil('li')
    .parent()
    .should('have.attr', 'data-expanded', 'true');
});

Then('Ser jeg produkt {string} er lukket', (productName: string) => {
  cy.contains(productName)
    .parentsUntil('li')
    .parent()
    .should('have.attr', 'data-expanded', 'false');
});

Then(
    'Ser jeg hjelpetekst {string} for {string} kravet',
    (infoText: string, title: string) => {
        cy.get('[class^="EditorFullPage"]')
            .contains(title)
            .parent()
            .parent()
            .contains(infoText);
    }
);

