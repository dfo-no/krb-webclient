import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { chosenWeekday } from './helpers';

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

When(
  'Jeg velger {string} fra tilgjengelige ukedager checkboxes',
  (day: string) => {
    cy.get(
      `input[name="question.config.weekdays[${chosenWeekday(day)}].isChecked"]`
    ).check({ force: true });
  }
);

Then('Ser jeg {string} er valgt', (day: string) => {
  cy.get(
    `input[name="question.config.weekdays[${chosenWeekday(day)}].isChecked"]`
  ).should('be.checked');
});

When('Jeg klikker på checkbox', () => {
  cy.get('input[type="checkbox"]').click();
});

When('Jeg klikker på tildelingskriterie checkbox', () => {
  cy.get('input[type="checkbox"]').first().click();
});

When('Jeg velger kodelist {string}', (code: string) => {
  cy.contains(code).parent().children().eq(0).click();
});

When(
  'Jeg legge til {string} fradrag for kode {string}',
  (discount: string, code: string) => {
    cy.contains(code)
      .parentsUntil('ul')
      .contains('Fradrag')
      .parent()
      .children()
      .eq(1)
      .clear()
      .type(discount);
  }
);

When(
    'Jeg legge til {string} fradrag',
    (discount: string) => {
        cy.get(
            `input[name="question.config.discount"]`)
            .clear()
            .type(discount);
    }
);

When(
  'Jeg klikker på obligatorisk checkbox for kode {string}',
  (code: string) => {
    cy.contains(code)
      .parentsUntil('ul')
      .contains('Obligatorisk')
      .parent()
      .children()
      .eq(0)
      .click();
  }
);

Then('Ser jeg fradrag for kode {string} er inaktiv', (code: string) => {
  cy.contains(code)
    .parentsUntil('ul')
    .contains('Fradrag')
    .parent()
    .should('have.attr', 'data-disabled', 'true');
});

Then(
  'Ser jeg valgt krav {string} inneholder {string} fradrag',
  (requirement: string, yesPoint: string) => {
    cy.get('[data-cy="product-requirement"]').contains(requirement);
    cy.get('[data-cy="chosen-configuration"]')
      .contains('Fradrag')
      .parent()
      .children()
      .eq(1)
      .contains(yesPoint);
  }
);

Then('Ser jeg {string} har verdi {string}', (text: string, value: string) => {
  cy.get('[data-cy="product-need"]')
    .contains(text)
    .parent()
    .should('include.text', value);
});

Then('Ser jeg valgte krav er {int} av 7', (value: number) => {
  cy.get('[data-cy="chosen-requirements"]').contains(value);
});

Then('Jeg ser en {string}-merkelapp', (text: string) => {
  cy.get('[class*="Badge"]').contains(text);
});
