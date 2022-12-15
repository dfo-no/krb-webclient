import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('Jeg redigerer produkt {string}', (productName: string) => {
  cy.get('[class*="EditorFullPage"]')
    .contains(productName)
    .parent()
    .parent()
    .contains('Rediger produktet')
    .click();
});

When(
  'Jeg klikker på {string} til produktkrav {string}',
  (button: string, requirement: string) => {
    cy.contains(requirement).parent().parent().contains(button).click();
  }
);

Then(
  'Ser jeg tittel er {string}, antall er {string}, type er {string} og beskrivelse er {string}',
  (title: string, amount: string, type: string, description: string) => {
    cy.contains(title);
    cy.contains(amount);
    cy.contains(type);
    cy.contains(description);
  }
);

Then('Ser jeg {int} behov i siden', (value: number) => {
  cy.get('[data-cy="product-need"]').should('have.length', value);
});

Then('Ser jeg {int} krav i siden', (value: number) => {
  cy.get('[data-cy="product-requirement"]').should('have.length', value);
});

Then(
  'Ser jeg behov {string} inneholder krav {string}',
  (need: string, requirement: string) => {
    cy.get('[data-cy="product-need"]').contains(need);
    cy.get('[data-cy="product-need"]')
      .find('[data-cy="product-requirement"]')
      .contains(requirement);
  }
);

When(
  'Jeg besvare kravet {string} som har type ja-nei med {string}',
  (requirement: string, answer: string) => {
    cy.get('[class^="ProductVariant"]').contains(requirement);
    cy.get('label').contains(answer).click();
  }
);

When('Jeg klikker på checkbox', () => {
  cy.get('input[type="checkbox"]').click();
});

Then(
  'Ser jeg valgt krav {string} inneholder {string} for ja og {string} for nei',
  (requirement: string, yesPoint: string, noPoint: string) => {
    cy.get('[data-cy="product-requirement"]').contains(requirement);
    cy.get('[data-cy="chosen-configuration"]')
      .contains('Ja')
      .parent()
      .children()
      .eq(1)
      .contains(yesPoint);
    cy.get('[data-cy="chosen-configuration"]')
      .contains('Nei')
      .parent()
      .children()
      .eq(1)
      .contains(noPoint);
  }
);

Then('Ser jeg valgte krav er {int} av 7', (value: number) => {
  cy.get('[data-cy="chosen-requirements"]').contains(value);
});

When(
  'Jeg velger {string} dato {int} for kravet',
  (label: string, date: number) => {
    if (label === 'Fra') {
      cy.get('[aria-label="Choose date"]')
        .first()
        .click({ waitForAnimations: true });
      cy.contains(date).click({ waitForAnimations: true });
    } else if (label === 'Til') {
      cy.get('[aria-label="Choose date"]')
        .last()
        .click({ waitForAnimations: true });
      cy.contains(date).click({ waitForAnimations: true });
    }
  }
);

Then('Ser jeg {string} har verdi {string}', (text: string, value: string) => {
  cy.get('[data-cy="product-need"]')
    .contains(text)
    .parent()
    .should('include.text', value);
});

Then('Jeg ser en {string}-merkelapp', (text: string) => {
  cy.get('[class*="Badge"]').contains(text);
});
