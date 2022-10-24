import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then('Ser jeg tittel er {string}, antall er {string}, vekting er {string}, type er {string} og beskrivelse er {string}',
  (title: string, amount: string, weight: string, type: string, description: string) => {
  cy.contains(title);
  cy.contains(amount);
  cy.contains(weight);
  cy.contains(type);
  cy.contains(description);
});

Then('Ser jeg {int} behove i side', (value: number) => {
  cy.get('[data-cy="product-need"]').should('have.length', value);
});

Then('Ser jeg {int} krav-ene i side', (value: number) => {
  cy.get('[data-cy="product-requirement"]').should('have.length', value);
});

Then('Ser jeg behov {string} inneholder krav {string}', (need: string, requirement: string) => {
  cy.get('[data-cy="product-need"]').contains(need);
  cy.get('[data-cy="product-need"]').find('[data-cy="product-requirement"]').contains(requirement);
});

Then('Jeg besvare kravet {string} som har type ja-nei med {string}', (requirement: string, answer: string) => {
  cy.get('[class^="ProductVariant"]').contains(requirement);
  cy.get("label").contains(answer).click();
})

Then('Ser jeg valgt krav {string} inneholder poeng for ja er {string} og poeng for nei er {string}',
  (requirement: string, yesPoint: string, noPoint: string) => {
    cy.get('[data-cy="product-requirement"]').contains(requirement);
    cy.get('[data-cy="chosen-configuration"]').contains('Ja').parent().children().eq(1).contains(yesPoint);
    cy.get('[data-cy="chosen-configuration"]').contains('Nei').parent().children().eq(1).contains(noPoint);
});

Then('Jeg velger {string} på vekting av produkt', (weight: string) => {
  let productWeighting: number | undefined;
  switch(weight) {
    case 'Lavest': {
      productWeighting = 0;
      break;
    }
    case 'Lav': {
      productWeighting = 25;
      break;
    }
    case 'Middels': {
      productWeighting = 50;
      break;
    }
    case 'Høy': {
      productWeighting = 75;
      break;
    }
    case 'Høyest': {
      productWeighting = 100;
      break;
    }
  }

  cy.get(`input[name="weight"]`)
    .as('range')
    .invoke('val', productWeighting)
    .trigger('change', {force: true});

  cy.get('@range').parent().parent().should('have.text', weight);
});

Then('Ser jeg valgte krav er {int} av 7', (value: number) => {
  cy.get('[data-cy="chosen-requirements"]').contains(value);
});
