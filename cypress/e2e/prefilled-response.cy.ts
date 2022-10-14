import { v4 as uuidv4 } from 'uuid';

describe('prefilled response', () => {
  it('can create and download prefilled response', () => {
    const somewhatRandomString = uuidv4().split('-')[0];
    cy.visit('localhost:3000');
    cy.contains('Søk etter')
      .parent()
      .click()
      .type('Kjøretøy til hjemmetjenesten');
    cy.contains('Kjøretøy til hjemmetjenesten').click();
    cy.contains('Kjøretøy til hjemmetjenesten');

    // Her starter "Lag forberedt besvarelse"
    cy.contains('Lag forberedt besvarelse').click();
    cy.get('input[placeholder="Navn på leverandør"]').type(
      'leverandør ' + somewhatRandomString
    );
    cy.contains('Lag forberedt besvarelse').click();
    cy.url().should('include', 'http://localhost:3000/prefilledresponse/');
    cy.contains('Kjøretøy til hjemmetjenesten');
    cy.contains('Last ned forberedt besvarelse');

    // Her legger vi til et nytt produkt og sjekker at alt ser riktig ut
    cy.contains('Legg til produkt').click();
    cy.get('input[placeholder="Navn på produkt"]').type(
      'bil ' + somewhatRandomString
    );
    cy.get('input[placeholder="Beskrivelse av produktet"]').type('enkel elbil');
    cy.contains('Krav du finner under Bil');
    cy.contains('Kjøreegenskaper');
    cy.contains('Inventar');
    cy.contains('Bagasjerom');
    cy.contains('Sikring');
    cy.contains('Utseende');

    // Her endrer vi produkttype til El-bil og ser at beskrivelsen av krav endrer seg
    cy.contains('El-bil').click();
    cy.should('not.contain', 'Krav du finner under Bil');
    cy.contains('Krav du finner under El-bil');
    cy.should('not.contain', 'Kjøreegenskaper');
    cy.contains('Inventar');
    cy.contains('Bagasjerom');
    cy.contains('Sikring');
    cy.contains('Utseende');

    // Her lagrer vi det nye produktet
    cy.get('button').contains('Lagre').click();

    // Her setter vi og lagrer informasjon om de to første kravene
    cy.contains('Tilbehør i kupé').parent().contains('Ikke besvart').click();
    cy.contains('Tilbehør i kupé').parent().contains('Lagre').click();
    cy.contains('Tilbehør i kupé')
      .parent()
      .should('not.contain', 'Ikke besvart')
      .click();
    cy.contains('Seter foran').parent().contains('Ikke besvart').click();
    cy.contains('Seter foran').parent().contains('Input').click();
    cy.contains('Seter foran')
      .parent()
      .get('input[type=number]')
      .type('{selectAll}2');
    cy.contains('Seter foran').parent().contains('Lagre').click();
    cy.contains('Seter foran')
      .parent()
      .should('not.contain', 'Ikke besvart')
      .click();
    cy.contains('Seter foran').parent().contains('Svar: 2 sete(r)');

    // Her prøver vi å laste ned den foreløpige forberedte besvarelsen
    cy.intercept(
      'POST',
      'https://krb-api-man-dev.azure-api.net/java/generatePrefilledResponse'
    ).as('generatePrefilledResponse');
    cy.contains('Last ned forberedt besvarelse').click();
    cy.wait('@generatePrefilledResponse').then((interception) => {
      expect(interception?.response?.statusCode).gte(200).lt(300);
      // console.log(interception)
      expect(interception?.response?.body.byteLength).gt(5000);
    });
  });
});
